const express = require("express");
const router = express.Router();
const {
  userRegister,
  verifyEmailRegister,
  userLogin,
} = require("../controllers/userController");
const verifyEmail = require("../middlewares/verifyEmail");

router.post("/login", verifyEmail, userLogin);

router.post("/register", userRegister);

router.get("/verify-email", verifyEmailRegister);

module.exports = router;
