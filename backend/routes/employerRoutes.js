const router = require("express").Router();
const {
  employerRegister,
  getEmployerProfile,
  getAllEmployerProfile,
  updateEmployer,
  getEmployerProfileByUserEmployerId,
  updateEmployerRating,
} = require("../controllers/employerController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("./uploadRoutes");

router.post(
  "/register/:id",
  protect,
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
  protect,
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

router.patch("/editemployerrating/:id", protect, updateEmployerRating);

router.get("/", getAllEmployerProfile);

router.get("/:id", protect, getEmployerProfile);

router.get("/userEmployerId/:id", getEmployerProfileByUserEmployerId);

module.exports = router;
