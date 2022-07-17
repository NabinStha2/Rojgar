const {
  getAllPaymentList,
  paymentUpdated,
  paymentDeleted,
  getLimitedPaymentList,
} = require("../controllers/paymentController");
const router = require("express").Router();

router.get("/", getAllPaymentList);

router.get("/:pageNumber", getLimitedPaymentList);

router.patch("/payByAdmin", paymentUpdated);

router.delete("/paymentDelete/:postID", paymentDeleted);

module.exports = router;
