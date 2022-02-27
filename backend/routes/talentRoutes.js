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
} = require("../controllers/talentController");

router.get("/", getAllTalentProfile);

router.get("/:id", getTalentProfile);

router.get("/usertalentId/:id", getTalentProfileByUserTalentId);

router.post("/register/:id", createTalent);

router.patch("/editTalent/:id", updateTalent);

router.patch("/bidsCreate/:id", createTalentBids);

router.patch("/bidsEdit/:id", editTalentBids);

router.patch("/bidsDelete/:id", deleteTalentBids);

module.exports = router;
