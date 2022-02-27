const router = require("express").Router();
const {
  employerRegister,
  getEmployerProfile,
  getAllEmployerProfile,
  updateEmployer,
  getEmployerProfileByUserEmployerId,
} = require("../controllers/employerController");

router.post("/register/:id", employerRegister);

router.put("/editemployer/:id", updateEmployer);

router.get("/", getAllEmployerProfile);

router.get("/:id", getEmployerProfile);

router.get("/userEmployerId/:id", getEmployerProfileByUserEmployerId);

module.exports = router;
