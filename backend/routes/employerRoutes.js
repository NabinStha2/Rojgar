const router = require("express").Router();
const {
  employerRegister,
  getEmployerProfile,
  getAllEmployerProfile,
  updateEmployer,
  getEmployerProfileByUserEmployerId,
  updateEmployerRating,
} = require("../controllers/employerController");
const upload = require("./uploadRoutes");

router.post(
  "/register/:id",
  upload.fields([
    {
      name: "image1",
      maxCount: 1,
    },
    {
      name: "image2",
      maxCount: 1,
    },
  ]),
  employerRegister
);

router.post(
  "/editemployer/:id",
  upload.fields([
    {
      name: "image1",
      maxCount: 1,
    },
    {
      name: "image2",
      maxCount: 1,
    },
  ]),
  updateEmployer
);

router.patch("/editemployerrating/:id", updateEmployerRating);

router.get("/", getAllEmployerProfile);

router.get("/:id", getEmployerProfile);

router.get("/userEmployerId/:id", getEmployerProfileByUserEmployerId);

module.exports = router;
