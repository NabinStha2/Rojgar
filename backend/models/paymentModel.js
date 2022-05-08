const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  postID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
  employerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Employer",
  },
  talentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Talent",
  },
  amount: { type: Number, required: true },
  date: { type: Date },
  isPaid: { type: Boolean, required: true },
  isFinished: { type: Boolean, default: false },
  paymentComplete: { type: Boolean, default: false },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
