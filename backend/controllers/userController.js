const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const generateToken = require("../utils/generateToken");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nabinstha246@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// User Login /user/login
module.exports.userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  // console.log(userExists);

  if (await bcrypt.compare(password, userExists.password)) {
    const token = generateToken({ id: userExists._id });

    console.log(userExists);

    res.status(200).json({
      userProfile: {
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        isComplete: userExists.isComplete,
        jobType: userExists.jobType,
        token: token,
      },
    });
  } else {
    res.status(401).json({ errMessage: "Password does not match." });
  }
});

// User Register /user/register
module.exports.userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, jobType } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400).json({ errMessage: "User already exists." });
  }

  const newUser = await User.create({
    name,
    email,
    password,
    emailToken: crypto.randomBytes(64).toString("hex"),
    isComplete: false,
    jobType,
  });

  if (newUser) {
    var mailOptions = {
      from: ' "Verify your email" <rojgar@gmail.com> ',
      to: newUser.email,
      subject: "ROJGAR -verify your email",
      html: ` <h2> ${newUser.name}! Thanks for registering on our <strong>ROJGAR</strong> site. </h2>
              <h4> Please verify your mail to continue... </h4>
              <a href="http://${req.headers.host}/user/verify-email?token=${newUser.emailToken}">Verify Your Email</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
        console.log("Verification email is sent to your gmail account");
      }
    });
    res.status(200).json({
      userProfile: newUser,
      verifyMessage: "Verification email is sent to your gmail account",
    });
  } else {
    res.status(400).json({ errMessage: "Invalid user data." });
  }
});

// Verify Email /user/verify-email
module.exports.verifyEmailRegister = asyncHandler(async (req, res) => {
  const token = req.query.token;
  // console.log(token);
  const user = await User.findOne({ emailToken: token });
  if (user) {
    user.emailToken = null;
    user.emailIsVerified = true;
    await user.save();
    res.redirect("http://localhost:3000/login");
  } else {
    res.redirect("http://localhost:3000/register");
    console.log("Email is not verified");
  }
});
