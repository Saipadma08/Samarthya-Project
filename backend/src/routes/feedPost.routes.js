const express =
require("express");

const router =
express.Router();

const multer =
require("multer");

const authMiddleware =
require("../middlewares/auth.middleware");

const {

    createPost

} = require(

"../controllers/feedPost.controller"

);


const upload = multer({

    storage:
    multer.memoryStorage()

});



router.post(

    "/create",

    authMiddleware,

    upload.single(
        "image"
    ),

    createPost

);



module.exports =
router;