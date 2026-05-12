const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {searchController, searchUsers, searchJobs} = require("../controllers/search.controller");

const router = express.Router();

router.get("/", authMiddleware, searchController);

router.get("/users", searchUsers);

router.get("/jobs", authMiddleware, searchJobs);

module.exports = router;