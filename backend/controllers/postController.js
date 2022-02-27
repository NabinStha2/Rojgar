const Post = require("../models/postModel");
const Employer = require("../models/employerModel");
const Talent = require("../models/talentModel");
const asyncHandler = require("express-async-handler");

module.exports.createPost = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    skillsRequirement,
    price,
    category,
    experiencedLevel,
  } = req.body;

  // console.log(req.body, req.params.id);

  const employerId = req.params.id;
  try {
    const newPost = await Post.create({
      title,
      description,
      skillsRequirement,
      price,
      category: category.trim().toLowerCase(),
      experiencedLevel,
      employerId,
    });
    const post = await Post.findById({ _id: newPost._id }).populate(
      "employerId"
    );

    const employer = await Employer.findById({ _id: employerId });
    employer.posts.push(newPost._id);
    // console.log(employer.posts);
    await Employer.findByIdAndUpdate({ _id: employerId }, employer, {
      new: true,
      timestamps: true,
    });

    res.status(201).json({
      projectPost: post,
    });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
});

module.exports.getAllPosts = asyncHandler(async (req, res) => {
  const perPage = 10;
  var skillsArray;
  const page = req.query.pageNumber || 1;
  const keyword = req.query.keyword || "";
  const querySkill = req.query.skills;
  const price = req.query.price;
  const experiencedLevel = req.query.experiencedLevel;
  if (querySkill) {
    skillsArray = querySkill.split(",");
  }

  try {
    const count = await Post.where({
      title: RegExp(keyword, "i"),
    }).countDocuments();

    // console.log(count);

    const post = await Post.find()
      .and([
        keyword ? { title: RegExp(keyword, "i") } : {},
        skillsArray ? { skillsRequirement: { $in: skillsArray } } : {},
        price ? { price: { $lte: price } } : {},
        experiencedLevel ? { experiencedLevel: experiencedLevel } : {},
      ])
      .limit(perPage)
      .skip(perPage * (page - 1)); //mongoose style

    // const post = await Post.find({ title: { $regex: keyword, $options: "i" } }); //mongo style

    // console.log(post);

    res.json({
      posts: post,
      pageNumber: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
});

module.exports.categorySearchProjects = asyncHandler(async (req, res) => {
  const category = req.params.category;
  //   console.log(`${category}`);
  try {
    // const post = await Post.where({ category });
    const post = await Post.find({ category: category });

    // console.log(post);
    res.json({
      posts: post,
    });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
});

module.exports.advanceSearchProjects = asyncHandler(async (req, res) => {
  var skillsArray;
  const keyword = req.query.keyword || "";
  const category = req.params.category;
  const querySkill = req.query.skills;
  const price = req.query.price;
  const experiencedLevel = req.query.experiencedLevel;
  if (querySkill) {
    skillsArray = querySkill.split(",");
  }

  // console.log(`${category} ${querySkill} ${price} ${experiencedLevel}`);
  // console.log(skillsArray);

  try {
    const post = await Post.find().and([
      keyword ? { title: RegExp(keyword, "i") } : {},
      { category: category },
      skillsArray ? { skillsRequirement: { $in: skillsArray } } : {},
      price ? { price: { $lte: price } } : {},
      experiencedLevel ? { experiencedLevel: experiencedLevel } : {},
    ]);
    //   .or([
    //     { skillsRequirement: { $in: skills } },
    //     { price: { $lte: price } },
    //     { experiencedLevel: experiencedLevel },
    //   ]);
    // .where("category")
    //   .in([category])
    //   .where("skillsRequirement")
    //   .in(skills)
    //   .where("price")
    //   .lte(price)
    //   .where("experiencedLevel")
    //   .in([experiencedLevel]);

    // console.log(post);
    res.json({
      posts: post,
    });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
});

module.exports.getPost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById({ _id: id }).populate(
      "employerId proposalSubmitted.talentId"
    );

    res.status(200).json({ projectPost: post });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
});

module.exports.getEmployerPosts = asyncHandler(async (req, res) => {
  const employerId = req.params.id;
  try {
    const post = await Post.find({ employerId }).populate({
      path: "employerId",
      select: "name email",
    });

    res.status(200).json({ posts: post });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
});

module.exports.updatePost = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    skillsRequirement,
    price,
    category,
    experiencedLevel,
  } = req.body;

  const id = req.params.id;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        skillsRequirement,
        price,
        category,
        experiencedLevel,
      },
      {
        new: true,
        timestamps: true,
      }
    ).populate("employerId");

    res.status(201).json({
      projectPost: updatedPost,
    });
  } catch (err) {
    res.status(304).json({ errMessage: err.message });
  }
});

module.exports.updatePostPaidProposal = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        isPaid: true,
      },
      {
        new: true,
        timestamps: true,
      }
    ).populate("employerId proposalSubmitted.talentId");

    res.status(201).json({
      projectPost: updatedPost,
    });
  } catch (err) {
    res.status(304).json({ errMessage: err.message });
  }
});

module.exports.updatePostAcceptProposal = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  console.log(req.body);

  try {
    const talent = await Talent.findById({ _id: req.body.talentId });
    talent.bids.map((bid) => {
      if (bid.postId.toString() === postId) {
        bid.isAccepted = true;
      }
    });
    const talentInfo = await Talent.findByIdAndUpdate(
      {
        _id: req.body.talentId,
      },
      talent,
      { new: true, timestamps: true }
    );

    const post = await Post.findById({ _id: postId });
    post.proposalSubmitted.map((proposal) => {
      if (proposal.talentId.toString() === req.body.talentId) {
        proposal.isAccepted = true;
      }
    });
    post.isAccept = true;
    const updatedPost = await Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      post,
      { new: true, timestamps: true }
    ).populate("employerId proposalSubmitted.talentId");

    res.status(201).json({
      projectPost: updatedPost,
    });
  } catch (err) {
    console.log(err.message);
    res.status(304).json({ errMessage: err.message });
  }
});

module.exports.updatePostFinishProposal = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  // console.log(req.body);

  try {
    const talent = await Talent.findById({ _id: req.body.talentId });
    talent.bids.map((bid) => {
      if (bid.postId.toString() === postId) {
        bid.isFinished = true;
      }
    });
    const talentInfo = await Talent.findByIdAndUpdate(
      {
        _id: req.body.talentId,
      },
      talent,
      { new: true, timestamps: true }
    );

    const post = await Post.findById({ _id: postId });
    post.proposalSubmitted.map((proposal) => {
      if (proposal.talentId.toString() === req.body.talentId) {
        proposal.isFinished = true;
      }
    });
    const updatedPost = await Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      post,
      { new: true, timestamps: true }
    ).populate("employerId proposalSubmitted.talentId");

    res.status(201).json({
      projectPost: updatedPost,
    });
  } catch (err) {
    console.log(err.message);
    res.status(304).json({ errMessage: err.message });
  }
});

module.exports.deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete({ _id: id }).populate(
      "employerId"
    );
    res.status(200).json({
      projectPost: deletedPost,
      message: "Project has been deleted successfully.",
    });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
});
