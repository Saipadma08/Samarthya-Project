const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middlewares/auth.middleware");

const {
  submitReview,
  getReviewsByUser,
  getTrustScore
} = require("../controllers/review.controller");

router.post(
  "/submit",
  authMiddleware,
  submitReview
);

router.get(
  "/:userId",
  getReviewsByUser
);

router.get(
  "/trust-score/:userId",
  getTrustScore
);

module.exports = router;