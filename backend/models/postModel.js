const mongoose = require("mongoose");
const crypto = require("crypto");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: { type: String, required: true },
    skillsRequirement: [
      { type: String, default: [], required: true, index: true },
    ],
    price: { type: Number, default: 0, required: true, index: true },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employer",
      index: true,
    },
    postToken: { type: String },
    category: { type: String, required: true, index: true },
    experiencedLevel: { type: String, required: true, index: true },
    isPaid: { type: Boolean, default: false },
    isAccept: { type: Boolean, default: false },
    isFinish: { type: Boolean, default: false },
    proposalSubmitted: [
      {
        talentId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Talent",
        },
        biddingAmt: { type: Number, default: 0 },
        proposalDescription: { type: String, default: "" },
        isAccepted: { type: Boolean, default: false },
        isFinished: { type: Boolean, default: false },
      },
    ],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  this.postToken = crypto.randomBytes(64).toString("hex");
  next();
});
console.log(postSchema.indexes());

const Post = mongoose.model("Post", postSchema);

// Post.collection.dropIndexes();

module.exports = Post;
