const mongoose=require("mongoose");

const reportSchema=new mongoose.Schema({

    reporter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    reportedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    targetType:{
        type:String,
        enum:[
            "profile",
            "post"
        ],
        required:true
    },

    targetId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:"targetModel"
    },

    targetModel:{
        type:String,
        enum:[
            "users",
            "FeedPost"
        ],
        required:true
    },

    category:{
        type:String,
        enum:[
            "spam",
            "harassment",
            "fake_account",
            "inappropriate",
            "other"
        ],
        required:true
    },

    description:{
        type:String
    },

    status:{
        type:String,
        enum:[
            "pending",
            "cleared",
            "blocked",
            "suspended"
        ],
        default:"pending"
    },

    suspensionEndsAt:{
        type:Date
    }

},{
    timestamps:true
});

reportSchema.index({

    reporter:1,

    reportedUser:1,

    targetId:1

},{
    unique:true
});

module.exports=
mongoose.model(
    "Report",
    reportSchema
);