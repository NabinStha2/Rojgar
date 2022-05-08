const mongoose = require("mongoose");
const Talent = require("../models/talentModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

// for ADMIN
module.exports.getAllTalentProfile = async (req, res) => {
  const perPage = 1;
  var skillsArray;
  const page = req.query.pageNumber || 1;
  const keyword = req.query.keyword || "";
  const querySkill = req.query.skills;
  const experiencedLevel = req.query.experiencedLevel;
  const category = req.query.category;
  if (querySkill) {
    skillsArray = querySkill.split(",");
  }

  // console.log(keyword, experiencedLevel, category, skillsArray);

  try {
    const count = await Talent.find()
      .and([
        skillsArray ? { "profile.skills": { $in: skillsArray } } : {},
        category ? { "profile.category": category } : {},
        experiencedLevel
          ? { "profile.experiencedLevel": experiencedLevel }
          : {},
      ])
      .or([
        keyword ? { "profile.name": RegExp(keyword, "i") } : {},
        keyword ? { "profile.email": RegExp(keyword, "i") } : {},
      ])
      .countDocuments();

    // console.log(count);

    const talentInfo = await Talent.find()
      .and([
        skillsArray ? { "profile.skills": { $in: skillsArray } } : {},
        category ? { "profile.category": category } : {},
        experiencedLevel
          ? { "profile.experiencedLevel": experiencedLevel }
          : {},
      ])
      .or([
        keyword ? { "profile.name": RegExp(keyword, "i") } : {},
        keyword ? { "profile.email": RegExp(keyword, "i") } : {},
      ])
      .limit(perPage)
      .skip(perPage * (page - 1))
      .populate("userTalentId", "name email")
      .lean(); //mongoose style

    // talentInfo.map((talent, i) =>
    //   console.log(talent.profile.name, talent.profile.email)
    // );

    res.json({
      talentProfile: talentInfo,
      pageNumber: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
};

module.exports.getTalentProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const talentInfo = await Talent.findById({ _id: id })
      .populate("talentId", "name email")
      .lean();

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
    })
      .populate("bids.postId")
      .lean();

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
    const post = await Post.findById({ _id: postId }).lean();
    post.proposalSubmitted.push(newPostBidsData);
    const posts = await Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      post,
      { new: true, timestamps: true }
    );
    // console.log(posts.proposalSubmitted);

    const talent = await Talent.findById({ _id: id }).lean();
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
    const post = await Post.findById({ _id: postId }).lean();
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

    const talent = await Talent.findById({ _id: id }).lean();

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
    const post = await Post.findById({ _id: postId }).lean();
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

    const talent = await Talent.findById({ _id: id }).lean();
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
    description,
    gender,
    dateOfBirth,
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
    facebookId,
    twitterId,
    linkedinId,
    githubId,
    portfolioLink,
    category,
    skills,
  } = req.body;
  const userTalentId = req.params.id;

  console.log(req.body);
  var skillsArray;
  if (skills) {
    skillsArray = skills.split(",");
  }

  try {
    const newTalent = await Talent.create({
      profile: {
        name: firstName + " " + lastName,
        email,
        title,
        dateOfBirth,
        description,
        gender,
        image:
          req.files["image1"] !== undefined
            ? req.files["image1"][0].filename
            : "",
        phoneNumber,
        experiencedLevel,
        profileRate,
        skills: skillsArray,
        category,
      },
      education: { college, degree },
      userTalentId,
      bankAcc: {
        khaltiId,
        khaltiName,
      },
      address: { country, city, provience },
      document: {
        resumeFile:
          req.files["image3"] !== undefined
            ? req.files["image3"][0].filename
            : "",
        citizenshipFile:
          req.files["image2"] !== undefined
            ? req.files["image2"][0].filename
            : "",
      },
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
    description,
    gender,
    phoneNumber,
    college,
    rating,
    ratingper,
    degree,
    experiencedLevel,
    profileRate,
    khaltiId,
    khaltiName,
    country,
    city,
    provience,
    facebookId,
    twitterId,
    linkedinId,
    githubId,
    portfolioLink,
    category,
    skills,
  } = req.body;
  console.log(req.body.skills);

  var skillsArray;
  if (skills) {
    skillsArray = skills.split(",");
  }
  const id = req.params.id;

  // console.log(req.files["image1"] !== undefined);
  // if (req.files["image1"].length !== 0) {
  //   console.log(
  //     req.files["image1"][0].originalname,
  //     req.files["image2"][0].originalname,
  //     req.files["image3"][0].originalname
  //   );
  // }

  try {
    const talent = await Talent.findById({ _id: id });
    const updatedTalent = await Talent.findByIdAndUpdate(
      { _id: id },
      {
        profile: {
          name,
          email,
          title,
          description,
          gender,
          image:
            req.files["image1"] !== undefined
              ? req.files["image1"][0].filename
              : talent.profile.image,
          phoneNumber,
          experiencedLevel,
          profileRate,
          rating,
          ratingper,
          category,
          skills: skillsArray,
        },
        education: { college, degree },
        bankAcc: {
          khaltiId,
          khaltiName,
        },
        address: { country, city, provience },
        document: {
          resumeFile:
            req.files["image3"] !== undefined
              ? req.files["image3"][0].filename
              : talent.document.resumeFile,
          citizenshipFile:
            req.files["image2"] !== undefined
              ? req.files["image2"][0].filename
              : talent.document.citizenshipFile,
        },
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
    console.log(err.message);
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.updateTalentRating = async (req, res) => {
  const { rating } = req.body;
  const id = req.params.id;

  try {
    const talent = await Talent.findById(id).lean();

    talent.profile.rating = talent.profile.rating + rating;
    talent.profile.ratingper = talent.profile.ratingper + 1;

    const updatedTalent = await Talent.findByIdAndUpdate({ _id: id }, talent, {
      new: true,
      timestamps: true,
    });

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
