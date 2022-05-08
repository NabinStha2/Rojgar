const Payment = require("../models/paymentModel");
const Post = require("../models/postModel");
const Talent = require("../models/talentModel");

module.exports.getAllPaymentList = async (req, res) => {
  try {
    const paymentList = await Payment.find()
      .populate("postID employerID talentID")
      .sort({ isPaid: -1, isFinished: -1, paymentComplete: 1 })
      .lean();
    res.status(200).json({ paymentList: paymentList });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ errMessage: err.message });
  }
};

module.exports.paymentUpdated = async (req, res) => {
  try {
    // console.log(req.body);
    await Payment.updateOne(
      { postID: req.body.postID },
      { paymentComplete: true }
    );
    const paymentList = await Payment.find()
      .populate("postID employerID talentID")
      .sort({ isPaid: -1, isFinished: -1, paymentComplete: 1 })
      .lean();

    res.status(200).json({ paymentList: paymentList });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ errMessage: err.message });
  }
};

module.exports.paymentDeleted = async (req, res) => {
  try {
    console.log(req.params);
    const talents = await Talent.find().lean();
    talents.map(async (talent) => {
      const t = talent.bids.filter(
        (bid) => bid.postId.toString() !== req.params.postID
      );
      console.log(t);
      await Talent.findByIdAndUpdate(
        {
          _id: talent._id,
        },
        { bids: t },
        { new: true, timestamps: true }
      );
    });
    await Payment.findOneAndDelete({ postID: req.params.postID });
    const paymentList = await Payment.find()
      .populate("postID employerID talentID")
      .sort({ isPaid: -1, isFinished: -1, paymentComplete: 1 })
      .lean();

    await Post.findByIdAndDelete({ _id: req.params.postID });

    res.status(200).json({ paymentList: paymentList });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ errMessage: err.message });
  }
};
