const Employer = require("../models/employerModel");
const User = require("../models/userModel");

module.exports.employerRegister = async (req, res) => {
  const {
    name,
    email,
    image,
    phoneNumber,
    country,
    city,
    provience,
    vatId,
    khaltiId,
    description,
    khaltiName,
    citizenshipFile,
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
        image,
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
      document: { citizenshipFile },
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
  try {
    const employerInfo = await Employer.find().populate(
      "userEmployerId",
      "name email"
    );

    res.status(200).json({ employerProfile: employerInfo });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.getEmployerProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const employerInfo = await Employer.findById({ _id: id }).populate(
      "userEmployerId",
      "name email"
    );

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
    }).populate("posts");

    // console.log(employerInfo);

    res.status(200).json({ employerProfile: employerInfo });
  } catch (err) {
    res.status(500).json({ errMessage: err.message });
  }
};

module.exports.updateEmployer = async (req, res) => {
  const {
    name,
    image,
    phoneNumber,
    country,
    city,
    email,
    provience,
    vatId,
    khaltiId,
    description,
    khaltiName,
    citizenshipFile,
    facebookId,
    twitterId,
    linkedinId,
    githubId,
    portfolioLink,
  } = req.body;
  const id = req.params.id;

  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(
      { _id: id },
      {
        profile: {
          name,
          image,
          phoneNumber,
          vatId,
          description,
          email,
        },
        bankAcc: {
          khaltiId,
          khaltiName,
        },
        address: { country, city, provience },
        document: { citizenshipFile },
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
    res.status(500).json({ errMessage: err.message });
  }
};
