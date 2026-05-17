const FeedPost =
require("../models/feedPost.model");

const Connection =
require("../models/connection.model");

const User =
require("../models/user.model");

const EmployeeProfile =
require("../models/employeeProfile.model");

const EmployerProfile =
require("../models/employerProfile.model");

const uploadFile =
require("../services/storage.service");



async function createPost(
    req,
    res
){

try{

    const userId=
    req.user.id;

    let imageUrl="";

    if(req.file){

        const file=
        req.file;

        const result=
        await uploadFile(

            file.buffer,

            file.originalname,

            "/samarthya/feed-posts"

        );

        imageUrl=
        result.url;

    }

    const newPost=
    await FeedPost.create({

        author:userId,

        text:req.body.text,

        image:imageUrl

    });

    const populatedPost=
    await FeedPost.findById(
        newPost._id
    )

    .populate(
        "author",
        "name profileImage role"
    );


    res.status(201).json({

        message:
        "Post created",

        post:
        populatedPost

    });

}

catch(err){

    console.log(err);

    res.status(500).json({

        message:
        "Server error"

    });

}

}


module.exports={

createPost

};