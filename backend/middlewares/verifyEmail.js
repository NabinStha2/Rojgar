const User = require("../models/userModel");

const verifyEmail = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    if (user.emailIsVerified) {
      next();
    } else {
      res.status(500).json({ errMessage: "User has not been verified." });
    }
  } else {
    res
      .status(404)
      .json({ errMessage: "User not found with this email address." });
  }
};

module.exports = verifyEmail;
