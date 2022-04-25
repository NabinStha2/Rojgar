const mongoose = require("mongoose");

const employerSchema = mongoose.Schema(
  {
    profile: {
      image: { type: String },
      name: { type: String, required: true },
      phoneNumber: { type: Number, required: true },
      email: { type: String, required: true },
      description: { type: String, required: true },
      vatId: { type: String, required: true },
      rating: { type: Number, default: 0 },
      ratingper: { type: Number, default: 0 },
    },
    userEmployerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    address: {
      country: { type: String },
      city: { type: String },
      provience: { type: String },
    },
    socialProfile: {
      facebookId: { type: String },
      twitterId: { type: String },
      githubId: { type: String },
      linkedinId: { type: String },
      portfolioLink: { type: String },
    },
    bankAcc: {
      khaltiId: { type: Number },
      khaltiName: { type: String },
    },
    document: {
      citizenshipFile: { type: String },
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);
employerSchema.index({ userEmployerId: 1 });
const Employer = mongoose.model("Employer", employerSchema);

module.exports = Employer;
