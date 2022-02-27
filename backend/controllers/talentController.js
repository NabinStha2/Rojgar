const mongoose = require("mongoose");
const Talent = require("../models/talentModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

// for ADMIN
module.exports.getAllTalentProfile = async (req, res) => {
  try {
    const talentInfo = await Talent.find().populate(
      "userTalentId",
      "name email"
    );

    res.status(200).json({ talentProfile: talentInfo });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.getTalentProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const talentInfo = await Talent.findById({ _id: id }).populate(
      "talentId",
      "name email"
    );

    res.status(200).json({ talentProfile: talentInfo });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.getTalentProfileByUserTalentId = async (req, res) => {
  const userTalentId = req.params.id;
  try {
    const talentInfo = await Talent.findOne({
      userTalentId,
    });

    // console.log(talentInfo);

    res.status(200).json({ talentProfile: talentInfo });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.createTalentBids = async (req, res) => {
  const id = req.params.id;
  const { biddingAmt, proposalDescription, postId } = req.body;
  try {
    const newPostBidsData = { talentId: id, proposalDescription, biddingAmt };
    const post = await Post.findById({ _id: postId });
    post.proposalSubmitted.push(newPostBidsData);
    const posts = await Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      post,
      { new: true, timestamps: true }
    );
    // console.log(posts.proposalSubmitted);

    const talent = await Talent.findById({ _id: id });
    const newTalentBidsData = { postId, biddingAmt, proposalDescription };
    talent.bids.push(newTalentBidsData);
    const talentInfo = await Talent.findByIdAndUpdate(
      {
        _id: id,
      },
      talent,
      { new: true, timestamps: true }
    );

    // console.log(talentInfo.bids);

    res.status(200).json({ talentProfile: talentInfo });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.editTalentBids = async (req, res) => {
  const id = req.params.id;
  const { biddingAmt, proposalDescription, postId } = req.body;
  // console.log(req.body);

  try {
    const post = await Post.findById({ _id: postId });
    post.proposalSubmitted.map((proposal) => {
      if (proposal.talentId.toString() === id) {
        proposal.biddingAmt = biddingAmt;
        proposal.proposalDescription = proposalDescription;
      }
    });
    const posts = await Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      post,
      { new: true, timestamps: true }
    );
    // console.log(posts.proposalSubmitted);

    const talent = await Talent.findById({ _id: id });

    talent.bids.map((bid) => {
      if (bid.postId.toString() === postId) {
        bid.biddingAmt = biddingAmt;
        bid.proposalDescription = proposalDescription;
      }
    });

    const talentInfo = await Talent.findByIdAndUpdate(
      {
        _id: id,
      },
      talent,
      { new: true, timestamps: true }
    );

    // console.log(talentInfo.bids);

    res.status(200).json({ talentProfile: talentInfo });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.deleteTalentBids = async (req, res) => {
  const id = req.params.id;
  const { postId } = req.body;

  console.log(id, postId);

  try {
    const post = await Post.findById({ _id: postId });
    const p = post.proposalSubmitted.filter(
      (proposal) => proposal.talentId.toString() !== id
    );
    // console.log(p);

    const posts = await Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      { proposalSubmitted: p },
      { new: true, timestamps: true }
    );
    // console.log(posts.proposalSubmitted);

    const talent = await Talent.findById({ _id: id });
    const t = talent.bids.filter((bid) => bid.postId.toString() !== postId);
    // console.log(t);

    const talentInfo = await Talent.findByIdAndUpdate(
      {
        _id: id,
      },
      { bids: t },
      { new: true, timestamps: true }
    );

    // console.log(talentInfo.bids);

    res.status(200).json({ talentProfile: talentInfo });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.createTalent = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    title,
    image,
    description,
    gender,
    phoneNumber,
    college,
    degree,
    experiencedLevel,
    profileRate,
    khaltiId,
    khaltiName,
    country,
    city,
    provience,
    resumeFile,
    citizenshipFile,
    facebookId,
    twitterId,
    linkedinId,
    githubId,
    portfolioLink,
    category,
    skills,
  } = req.body;
  const userTalentId = req.params.id;

  // console.log(req.body);

  try {
    const newTalent = await Talent.create({
      profile: {
        name: firstName + " " + lastName,
        email,
        title,
        description,
        gender,
        image,
        phoneNumber,
        experiencedLevel,
        profileRate,
        skills,
        category,
      },
      education: { college, degree },
      userTalentId,
      bankAcc: {
        khaltiId,
        khaltiName,
      },
      address: { country, city, provience },
      document: { resumeFile, citizenshipFile },
      socialProfile: {
        facebookId,
        twitterId,
        linkedinId,
        githubId,
        portfolioLink,
      },
      isComplete: true,
    });

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userTalentId },
      { isComplete: true },
      { new: true }
    );

    console.log(updatedUser);

    res.status(201).json({ talentProfile: newTalent });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.updateTalent = async (req, res) => {
  const {
    name,
    email,
    title,
    image,
    description,
    gender,
    phoneNumber,
    college,
    degree,
    experiencedLevel,
    profileRate,
    khaltiId,
    khaltiName,
    country,
    city,
    provience,
    resumeFile,
    citizenshipFile,
    facebookId,
    twitterId,
    linkedinId,
    githubId,
    portfolioLink,
    category,
    skills,
  } = req.body;
  const id = req.params.id;

  try {
    const updatedTalent = await Talent.findByIdAndUpdate(
      { _id: id },
      {
        profile: {
          name,
          email,
          title,
          description,
          gender,
          image,
          phoneNumber,
          experiencedLevel,
          profileRate,
          category,
          skills,
        },
        education: { college, degree },
        bankAcc: {
          khaltiId,
          khaltiName,
        },
        address: { country, city, provience },
        document: { resumeFile, citizenshipFile },
        socialProfile: {
          facebookId,
          twitterId,
          linkedinId,
          githubId,
          portfolioLink,
        },
      },
      {
        new: true,
        timestamps: true,
      }
    );

    res.status(200).json({ talentProfile: updatedTalent });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

// for ADMIN
module.exports.deleteTalent = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTalent = await Post.findByIdAndDelete({ _id: id });
    res.status(200).json({
      talentProfile: deletedTalent,
      message: "Project has been deleted successfully.",
    });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
};
