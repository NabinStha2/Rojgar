const Post = require("../models/postModel");
const Payment = require("../models/paymentModel");
const Employer = require("../models/employerModel");
const Talent = require("../models/talentModel");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

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
    var newPost;
    // for (let i = 0; i < 2000000; i++) {
    console.log("post created");
    newPost = await Post.create({
      title,
      description,
      skillsRequirement,
      price,
      category: category.trim().toLowerCase(),
      experiencedLevel,
      employerId,
    });
    // }
    // const newPost = await Post.create({
    //   title,
    //   description,
    //   skillsRequirement,
    //   price,
    //   category: category.trim().toLowerCase(),
    //   experiencedLevel,
    //   employerId,
    // });
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

    await Payment.create({
      postID: post._id,
      employerID: employer._id,
      date: new Date().toLocaleString().split("T")[0],
      amount: post.price,
      isPaid: false,
      paymentComplete: false,
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

  // console.log("pageNumber: ", page);

  try {
    // await Post.deleteMany({ title: "aaaa" });
    console.log(
      await Post.find({
        $and: [
          keyword ? { title: RegExp(keyword, "i") } : {},
          skillsArray ? { skillsRequirement: { $in: skillsArray } } : {},
          price ? { price: { $lte: price } } : {},
          experiencedLevel ? { experiencedLevel: experiencedLevel } : {},
        ],
      }).explain()
    );
    const count = await Post.find({
      $and: [
        keyword ? { title: RegExp(keyword, "i") } : {},
        skillsArray ? { skillsRequirement: { $in: skillsArray } } : {},
        price ? { price: { $lte: price } } : {},
        experiencedLevel ? { experiencedLevel: experiencedLevel } : {},
      ],
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
      .skip(perPage * (page - 1))
      .lean(); //mongoose style

    // const post = await Post.find({ title: { $regex: keyword, $options: "i" } }); //mongo style

    // console.log(post);

    res.json({
      posts: post,
      pageNumber: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (err) {
    console.log(err.message, err.stack);
    res.status(409).json({ errMessage: err.message });
  }
});

module.exports.categorySearchProjects = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const perPage = 10;
  const page = req.query.pageNumber || 1;
  console.log(`${category} ${page}`);

  try {
    console.log(
      await Post.where({
        category: category,
      }).explain()
    );
    const count = await Post.where({
      category: category,
    }).countDocuments();

    console.log(count);

    const post = await Post.find({ category: category })
      .limit(perPage)
      .skip(perPage * (page - 1))
      .lean();

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

module.exports.advanceSearchProjects = asyncHandler(async (req, res) => {
  var skillsArray;
  const perPage = 10;
  const page = req.query.pageNumber || 1;
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
    console.log(
      await Post.find({
        $and: [
          keyword ? { title: RegExp(keyword, "i") } : {},
          { category: category },
          skillsArray ? { skillsRequirement: { $in: skillsArray } } : {},
          price ? { price: { $lte: price } } : {},
          experiencedLevel ? { experiencedLevel: experiencedLevel } : {},
        ],
      }).explain()
    );
    const count = await Post.find({
      $and: [
        keyword ? { title: RegExp(keyword, "i") } : {},
        { category: category },
        skillsArray ? { skillsRequirement: { $in: skillsArray } } : {},
        price ? { price: { $lte: price } } : {},
        experiencedLevel ? { experiencedLevel: experiencedLevel } : {},
      ],
    }).countDocuments();

    // console.log(count);

    const post = await Post.find()
      .and([
        keyword ? { title: RegExp(keyword, "i") } : {},
        { category: category },
        skillsArray ? { skillsRequirement: { $in: skillsArray } } : {},
        price ? { price: { $lte: price } } : {},
        experiencedLevel ? { experiencedLevel: experiencedLevel } : {},
      ])
      .limit(perPage)
      .skip(perPage * (page - 1))
      .lean();
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
      pageNumber: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
});

module.exports.getPost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById({ _id: id })
      .populate("employerId proposalSubmitted.talentId")
      .lean();

    res.status(200).json({ projectPost: post });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
});

module.exports.getEmployerPosts = asyncHandler(async (req, res) => {
  const employerId = req.params.id;
  try {
    const post = await Post.find({ employerId })
      .populate({
        path: "employerId",
        select: "name email",
      })
      .lean();

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
    )
      .populate("employerId proposalSubmitted.talentId")
      .lean();

    await Payment.updateOne({ postID: id }, { amount: price });

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

    await Payment.updateOne({ postID: id }, { isPaid: true });

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

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nabinstha246@gmail.com",
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const talent = await Talent.findById({ _id: req.body.talentId }).lean();
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

    const post = await Post.findById({ _id: postId })
      .populate("employerId")
      .lean();
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

    await Payment.updateOne({ postID: postId }, { talentID: talent._id });

    var mailOptions = {
      from: ' "Proposal accepted" <rojgar@gmail.com> ',
      to: talent.profile.email,
      subject: "ROJGAR - You have been hired.",
      html: ` <h2> ${talent.profile.name}! Thanks for bidding on our <strong>PROJECT</strong>. </h2>
              <h4> You have been hired. Please contact the client through email address <strong>${post.employerId.profile.email}</strong>. </h4>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
        console.log(
          "Accepting notification is sent to the Talent gmail account"
        );
      }
    });

    res.status(201).json({
      projectPost: updatedPost,
      acceptMessage:
        "Accepting notification is sent to the Talent gmail account",
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
    const talent = await Talent.findById({ _id: req.body.talentId }).lean();
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

    const post = await Post.findById({ _id: postId }).lean();
    post.isFinish = true;
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

    await Payment.updateOne({ postID: postId }, { isFinished: true });

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
    const talents = await Talent.find().lean();
    const talentInfo = talents.map(async (talent) => {
      const t = talent.bids.filter((bid) => bid.postId.toString() !== id);
      // console.log(t);
      await Talent.findByIdAndUpdate(
        {
          _id: talent._id,
        },
        { bids: t },
        { new: true, timestamps: true }
      );
    });

    const deletedPost = await Post.findByIdAndDelete({ _id: id }).populate(
      "employerId proposalSubmitted.talentId"
    );

    const employer = await Employer.findById({
      _id: deletedPost.employerId._id,
    });
    const e = employer.posts.filter(
      (post) => post.toString() !== id.toString()
    );
    await Employer.findByIdAndUpdate(
      {
        _id: deletedPost.employerId._id,
      },
      { posts: e },
      { new: true, timestamps: true }
    );

    await Payment.findOneAndDelete({ postID: id });

    res.status(200).json({
      projectPost: deletedPost,
      message: "Project has been deleted successfully.",
    });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
});
