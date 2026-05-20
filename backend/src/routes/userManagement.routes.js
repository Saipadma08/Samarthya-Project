const express = require("express");

const authMiddleware =
require("../middlewares/auth.middleware");

const {

requestReview,

getReviewUsers,

reviewAction,

getReviewStatus

}

=

require(
"../controllers/userManagement.controller"
);

const router =
express.Router();

router.post(
"/request-review",
requestReview
);

router.get(
"/account-review/:type",
authMiddleware,
getReviewUsers
);

router.put(
"/review-action/:userId",
authMiddleware,
reviewAction
);

router.get(
"/review-status",
getReviewStatus
);

module.exports = router;