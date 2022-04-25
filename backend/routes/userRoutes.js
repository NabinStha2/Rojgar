const express = require("express");
const router = express.Router();
const {
  userRegister,
  verifyEmailRegister,
  userLogin,
  sendOtp,
  verifyOTP
} = require("../controllers/userController");
const verifyEmail = require("../middlewares/verifyEmail");

router.post("/login", verifyEmail, userLogin);

router.post("/register", userRegister);

router.get("/verify-email", verifyEmailRegister);

router.post("/sendOtp", sendOtp);

router.post("/verify-OTP", verifyOTP);

module.exports = router;
