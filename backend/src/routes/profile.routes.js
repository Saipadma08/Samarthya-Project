const express = require("express");

const router = express.Router();

const {
  getPublicProfile
} = require("../controllers/profile.controller");

router.get("/:userId", getPublicProfile);

module.exports = router;    