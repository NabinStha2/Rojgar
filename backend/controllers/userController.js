const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const generateToken = require("../utils/generateToken");
const Otp = require("../models/otpModel");

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
  const { email, password, updatePW } = req.body;

  const userExists = await User.findOne({ email });
  // console.log(password);

  if (updatePW) {
    // console.log("before", userExists.password);
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(password, salt);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userExists._id },
      {
        name: userExists.name,
        email: userExists.email,
        password: hashedPW,
        emailToken: userExists.emailToken,
        isComplete: userExists.isComplete,
        jobType: userExists.jobType,
      },
      { new: true, timestamps: true }
    );
    // console.log("after", updatedUser.password);
    if (await bcrypt.compare(password, updatedUser.password)) {
      const token = generateToken({ id: updatedUser._id });

      // console.log(updatedUser);

      res.status(200).json({
        userProfile: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isComplete: updatedUser.isComplete,
          jobType: updatedUser.jobType,
          token: token,
        },
      });
    } else {
      res.status(401).json({ errMessage: "Password does not match." });
    }
  }

  // console.log(userExists);
  else if (await bcrypt.compare(password, userExists.password)) {
    const token = generateToken({ id: userExists._id });

    // console.log(userExists);

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

module.exports.sendOtp = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    var otpCode = `${Math.floor(1000 + Math.random() * 9000)}`;

    var mailOptions = {
      from: ' "RESET your email" <rojgar@gmail.com> ',
      to: userExist.email,
      subject: "ROJGAR -verify your email",
      html: ` <p>Enter ${otpCode} in the app to verify your email address and Complete the reset process.</p>
              <p> This code <b>expires in 1 hour</b>.</p> `,
    };

    const hashedOTP = await bcrypt.hash(otpCode, 10);

    console.log(otpCode);

    await Otp.deleteMany({ userId: userExist._id });

    const newOTP = await Otp({
      userId: userExist._id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresIn: Date.now() + 3600 * 1000,
    });

    await newOTP.save();

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
        console.log(
          "Password Resetting for email is sent to your gmail account"
        );
      }
    });
    // console.log(userExist._id);

    res.status(200).json({
      userId: userExist._id,
      OTPMessage: "Password Resetting for email is sent to your gmail account",
    });
  } catch (err) {
    res.status(400).json({
      err: err.message,
      OTPMessage: "Something went wrong.",
    });
  }
};

module.exports.verifyOTP = async (req, res) => {
  try {
    let { userId, otp } = req.body;

    console.log(userId, otp);

    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed");
    } else {
      const OTPVerificationRecords = await Otp.findOne({ userId });
      if (OTPVerificationRecords.length <= 0) {
        throw new Error("No otp verification records found.");
      } else {
        console.log(OTPVerificationRecords);
        const { expiresIn } = OTPVerificationRecords;
        const hashedOTP = OTPVerificationRecords.otp;
        if (expiresIn < Date.now()) {
          await Otp.deleteMany({ userId });
          throw new Error("Code has been expired. Please request again.");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            throw new Error("Invalid otp code passed. Check your inbox.");
          } else {
            // await User.updateOne({ _id: userId }, { pwResetOtpVerified: true });
            await Otp.deleteMany({ userId });

            res.status(200).json({
              OTPMessage: "Otp has been Verified. Write a new password.",
            });
          }
        }
      }
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
      OTPMessage: "Something went wrong.",
    });
  }
};
