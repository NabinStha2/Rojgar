const Employer = require("../models/employerModel");
const User = require("../models/userModel");

module.exports.employerRegister = async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    country,
    city,
    provience,
    vatId,
    khaltiId,
    description,
    khaltiName,
    facebookId,
    twitterId,
    linkedinId,
    githubId,
    portfolioLink,
  } = req.body;
  const userEmployerId = req.params.id;
  //   console.log(req.body, req.params.id);
  try {
    const newEmployer = await Employer.create({
      profile: {
        name,
        email,
        image:
          req.files["image1"] !== undefined
            ? req.files["image1"][0].filename
            : "",
        phoneNumber,
        vatId,
        description,
      },
      userEmployerId,
      bankAcc: {
        khaltiId,
        khaltiName,
      },
      address: { country, city, provience },
      document: {
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
      { _id: userEmployerId },
      { isComplete: true },
      { new: true }
    );

    // console.log(newEmployer);
    res.status(201).json({ employerProfile: newEmployer });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
};

module.exports.getAllEmployerProfile = async (req, res) => {
  const perPage = 5;
  const page = req.query.pageNumber || 1;
  const keyword = req.query.keyword || "";
  const email = req.query.email;

  console.log(keyword, email);

  try {
    const count = await Employer.find()
      .or([
        keyword ? { "profile.name": RegExp(keyword, "i") } : {},
        keyword ? { "profile.email": RegExp(keyword, "i") } : {},
      ])
      .countDocuments();

    console.log(count);

    const employerInfo = await Employer.find()
      .or([
        keyword ? { "profile.name": RegExp(keyword, "i") } : {},
        keyword ? { "profile.email": RegExp(keyword, "i") } : {},
      ])
      .limit(perPage)
      .skip(perPage * (page - 1))
      .populate("userEmployerId", "name email")
      .lean(); //mongoose style

    employerInfo.map((employer, i) =>
      console.log(employer.profile.name, employer.profile.email)
    );

    res.json({
      employerProfile: employerInfo,
      pageNumber: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (err) {
    res.status(409).json({ errMessage: err.message });
  }
};

module.exports.getEmployerProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const employerInfo = await Employer.findById({ _id: id })
      .populate("userEmployerId", "name email")
      .lean();

    res.status(200).json({ employerProfile: employerInfo });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.getEmployerProfileByUserEmployerId = async (req, res) => {
  const userEmployerId = req.params.id;
  try {
    const employerInfo = await Employer.findOne({
      userEmployerId: userEmployerId,
    })
      .populate("posts")
      .lean();

    // console.log(employerInfo);

    res.status(200).json({ employerProfile: employerInfo });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.updateEmployer = async (req, res) => {
  const {
    name,
    phoneNumber,
    rating,
    ratingper,
    country,
    city,
    email,
    provience,
    vatId,
    khaltiId,
    description,
    khaltiName,
    facebookId,
    twitterId,
    linkedinId,
    githubId,
    portfolioLink,
  } = req.body;
  // console.log(req.body);
  // console.log(req.file.originalname, req.file.path);
  const id = req.params.id;

  // console.log(req.files["image1"][0].originalname);
  try {
    const employer = await Employer.findById({ _id: id });
    const updatedEmployer = await Employer.findByIdAndUpdate(
      { _id: id },
      {
        profile: {
          name,
          image:
            req.files["image1"] !== undefined
              ? req.files["image1"][0].filename
              : employer.profile.image,
          phoneNumber,
          vatId,
          description,
          email,
          rating,
          ratingper,
        },
        bankAcc: {
          khaltiId,
          khaltiName,
        },
        address: { country, city, provience },
        document: {
          citizenshipFile:
            req.files["image2"] !== undefined
              ? req.files["image2"][0].filename
              : employer.document.citizenshipFile,
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
    res.status(200).json({ employerProfile: updatedEmployer });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.updateEmployerRating = async (req, res) => {
  const { rating } = req.body;
  const id = req.params.id;

  // console.log(rating, id);

  try {
    const employer = await Employer.findById(id).lean();

    employer.profile.rating = employer.profile.rating + rating;
    employer.profile.ratingper = employer.profile.ratingper + 1;

    const updatedEmployer = await Employer.findByIdAndUpdate(
      { _id: id },
      employer,
      {
        new: true,
        timestamps: true,
      }
    );

    res.status(200).json({ employerProfile: updatedEmployer });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};
