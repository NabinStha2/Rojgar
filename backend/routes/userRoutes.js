const express = require("express");
const router = express.Router();
const {
  userRegister,
  verifyEmailRegister,
  userLogin,
  sendOtp,
  verifyOTP,
  refreshToken,
  logout,
} = require("../controllers/userController");
const verifyEmail = require("../middlewares/verifyEmail");

router.post("/refreshToken", refreshToken);

router.post("/login", verifyEmail, userLogin);

router.post("/register", userRegister);

router.get("/verify-email", verifyEmailRegister);

router.post("/sendOtp", sendOtp);

router.post("/verify-OTP", verifyOTP);

router.post("/logout", logout);

module.exports = router;
