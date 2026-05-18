const express =
require("express");

const router =
express.Router();

const auth =
require(
"../middlewares/auth.middleware"
);

const {

createReport,

getMyReports,

getComplaints,

getAllReports,

clearReport,

blockUser,

suspendUser,

unblockUser,

removeSuspension

} = require(
"../controllers/report.controller"
);



router.post(
"/",
auth,
createReport
);


router.get(
"/my-reports",
auth,
getMyReports
);


router.get(
"/complaints",
auth,
getComplaints
);


router.get(
"/all",
auth,
getAllReports
);


router.put(
"/clear/:id",
auth,
clearReport
);


router.put(
"/block/:id",
auth,
blockUser
);


router.put(
"/suspend/:id",
auth,
suspendUser
);


router.put(
"/unblock/:id",
auth,
unblockUser
);


router.put(
"/remove-suspension/:id",
auth,
removeSuspension
);


module.exports =
router;