const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const employerDashboardController = require("../controllers/employerDashboard.controller");
const {employerProfileController, getProfile, updateProfile} = require("../controllers/employerProfile.controller");
const employerPostJobController = require("../controllers/employerPostJob.controller");
const employerJobsPostedController = require("../controllers/employerJobsPosted.controller");
const employerApplicantsController = require("../controllers/employerApplicants.controller");

const multer = require("multer");


const upload = multer({
  storage: multer.memoryStorage()
});


const router = express.Router();

router.get('/dashboard', authMiddleware, roleMiddleware("employer"), employerDashboardController);
router.get('/profile', authMiddleware, roleMiddleware("employer"), employerProfileController);
router.get('/post-job', authMiddleware, roleMiddleware("employer"), employerPostJobController);
router.get('/posted-jobs', authMiddleware, roleMiddleware("employer"), employerJobsPostedController);
router.get('/applicants', authMiddleware, roleMiddleware("employer"), employerApplicantsController);


// profile data
router.get("/profile-data", authMiddleware, roleMiddleware("employer"), getProfile);

router.put("/profile-data", authMiddleware, roleMiddleware("employer"), 
            upload.fields([
            { name: "profileImage", maxCount: 1 },
            { name: "coverImage", maxCount: 1 }
        ]),

        updateProfile
);


module.exports = router;