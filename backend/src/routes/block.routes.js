const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const {

    blockUser,
    unblockUser,
    getBlockedUsers

} = require(
    "../controllers/block.controller"
);


router.post(
    "/:userId",
    auth,
    blockUser
);

router.delete(
    "/:userId",
    auth,
    unblockUser
);

router.get(
    "/",
    auth,
    getBlockedUsers
);

module.exports = router;