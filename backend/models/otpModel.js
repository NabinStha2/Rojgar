const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  userId: { type: String },
  otp: { type: String },
  expiresIn: { type: Date },
  createdAt: { type: Date },
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
