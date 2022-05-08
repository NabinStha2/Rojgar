const {
  getAllPaymentList,
  paymentUpdated,
  paymentDeleted,
} = require("../controllers/paymentController");
const router = require("express").Router();

router.get("/", getAllPaymentList);

router.patch("/payByAdmin", paymentUpdated);

router.delete("/paymentDelete/:postID", paymentDeleted);

module.exports = router;
