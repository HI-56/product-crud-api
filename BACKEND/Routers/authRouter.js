import express from "express";
import {
  signup,
  login,
  forgotPswd,
  verifyResetCode,
  resetPswd,
} from "../Services/authService.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPswd", forgotPswd);
router.post("/verifyResetCode", verifyResetCode);
router.patch("/resetPswd", resetPswd);

export default router;
