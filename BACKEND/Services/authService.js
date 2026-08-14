import jwt from "jsonwebtoken";
import users from "../Models/usersModel.js";
import bcrypt from "bcryptjs";
import { ApiError } from "../Utils/apiError.js";

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
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("You are not logged in, please login again", 401));
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
    if(pswdChangeAtTimesTamp>decoded.iat){
      return next(new ApiError("user recently changed his password, please login again...",401))
    }
  }
//send user to next middleware
  req.user = currentUser;
  next();
};
