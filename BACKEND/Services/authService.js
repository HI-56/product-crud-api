import crypto from "crypto";
import jwt from "jsonwebtoken";
import users from "../Models/usersModel.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../Utils/apiError.js";
import sendEamil from "../Utils/sendEmail.js";


export const signup = async (req, res, next) => {
  try {
    const user = await users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    res.status(201).json({ success: true, data: user, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await users.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({
        errorMsg: "incorrect email or password ",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
 
    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const protect = async (req, res, next) => {
  let token;
  //check if token exists
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new ApiError("You are not logged in, please login again", 401),
      );
    }
    //check token(no change or expired token )
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //check if user exists
    const currentUser = await users.findById(decoded.userId);
    if (!currentUser) {
      return next(new ApiError("this user is no longer exist", 401));
    }
    //check if user change his password after token created
    if (currentUser.pswdChangeAt) {
      const pswdChangeAtTimesTamp = parseInt(
        currentUser.pswdChangeAt.getTime() / 1000,
        10,
      );
      if (pswdChangeAtTimesTamp > decoded.iat) {
        return next(
          new ApiError(
            "user recently changed his password, please login again...",
            401,
          ),
        );
      }
    }
    //send user to next middleware
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new ApiError("Invalid or expired token", 401));
  }
};

export const allowedTo =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403),
      );
    }
    next();
  };

export const forgotPswd = async (req, res, next) => {
  //get user by email
  const user = await users.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`no user found with the email ${req.body.email}`, 404),
    );
  }

  //if user exist generate random reset code
  const resetCode = Math.floor(Math.random() * 900000 + 100000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");

  //save it into db ;
  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpires = Date.now() + 5 * 60 * 1000;
  user.ResetIsVerefied = false;
  await user.save();

  //send reset code via email
  try {
    sendEamil({
      email: user.email,
      subject: "Your password reset code (valid for 5 min only)",
      message: `hi ${user.name} \n Your verification code is: ${resetCode}\n Don't share this code with anyone else.`,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.ResetIsVerefied = undefined;
    await user.save();
    return next(new ApiError("there is a problem in sending email", 500));
  }
  res.status(200).json({ success: true, message: "reset code sent to email" });
};

export const verifyResetCode = async (req, res, next) => {
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await users.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError("invalid reset code", 404));
  }
  user.ResetIsVerefied = true;
  await user.save();
  res.status(200).json({ success: true });
};

export const resetPswd = async (req, res, next) => {
  const user = await users.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("no user found with this email", 404));
  }
  if (!user.ResetIsVerefied) {
    return next(new ApiError("reset code not verefied", 400));
  }
  user.password = req.body.newPassword;
  user.pswdChangeAt = Date.now();
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.ResetIsVerefied = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "password reseted successfuly, now login with new password",
  });
};
