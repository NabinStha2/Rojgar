const router = require("express").Router();
const {
  createTalent,
  updateTalent,
  getTalentProfile,
  getAllTalentProfile,
  getTalentProfileByUserTalentId,
  createTalentBids,
  editTalentBids,
  deleteTalentBids,
  updateTalentRating,
} = require("../controllers/talentController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("./uploadRoutes");

router.get("/", getAllTalentProfile);

router.get("/:id", protect, getTalentProfile);

router.get("/usertalentId/:id", getTalentProfileByUserTalentId);

router.post(
  "/register/:id",
  protect,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  createTalent
);

router.patch(
  "/editTalent/:id",
  protect,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateTalent
);

router.patch("/editTalentRating/:id", protect, updateTalentRating);

router.patch("/bidsCreate/:id", protect, createTalentBids);

router.patch("/bidsEdit/:id", protect, editTalentBids);

router.patch("/bidsDelete/:id", protect, deleteTalentBids);

module.exports = router;
