const mongoose = require("mongoose");

const feedPostSchema = new mongoose.Schema(

{

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    text:{
        type:String,
        maxlength:500
    },

    image:{
        type:String
    },

    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    ]

},

{
    timestamps:true
}

);

module.exports =
mongoose.model(
    "FeedPost",
    feedPostSchema
);