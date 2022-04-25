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
const upload = require("./uploadRoutes");

router.get("/", getAllTalentProfile);

router.get("/:id", getTalentProfile);

router.get("/usertalentId/:id", getTalentProfileByUserTalentId);

router.post(
  "/register/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  createTalent
);

router.patch(
  "/editTalent/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateTalent
);

router.patch("/editTalentRating/:id", updateTalentRating);

router.patch("/bidsCreate/:id", createTalentBids);

router.patch("/bidsEdit/:id", editTalentBids);

router.patch("/bidsDelete/:id", deleteTalentBids);

module.exports = router;
