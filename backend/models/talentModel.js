const mongoose = require("mongoose");

const talentSchema = mongoose.Schema(
  {
    profile: {
      name: { type: "string" },
      title: { type: String },
      description: { type: String },
      image: { type: String },
      gender: { type: "string", enum: ["male", "female", "other", ""] },
      dateOfBirth: { type: String },
      phoneNumber: { type: Number },
      email: { type: String },
      experiencedLevel: { type: String },
      category: { type: String },
      profileRate: { type: Number },
      skills: [{ type: String, default: [] }],
      rating: { type: Number, default: 0 },
      ratingper: { type: Number, default: 0 },
    },
    education: {
      college: { type: String, default: "" },
      degree: { type: String, default: "" },
    },
    isComplete: { type: Boolean, default: false },
    userTalentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    bankAcc: {
      khaltiId: { type: Number },
      khaltiName: { type: String },
    },
    address: {
      country: { type: String },
      city: { type: String },
      provience: { type: String },
    },
    document: {
      resumeFile: { type: String },
      citizenshipFile: { type: String },
    },
    socialProfile: {
      facebookId: { type: String },
      twitterId: { type: String },
      githubId: { type: String },
      linkedinId: { type: String },
      portfolioLink: { type: String },
    },
    bids: [
      {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Post",
        },
        biddingAmt: { type: Number, default: 0 },
        proposalDescription: { type: String, default: "" },
        isAccepted: { type: Boolean, default: false },
        isFinished: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

talentSchema.index({ userTalentId: 1 });

const Talent = mongoose.model("Talent", talentSchema);

module.exports = Talent;
