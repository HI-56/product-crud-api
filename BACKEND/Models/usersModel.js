import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "you should enter a valid name"],
    },
    email: {
      type: String,
      required: [true, "you should enter a valid email"],
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "you should enter a valid password"],
      minlength: [6, "the password is too short"],
    },
    pswdChangeAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    ResetIsVerefied: Boolean,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model("Users", UserSchema);
