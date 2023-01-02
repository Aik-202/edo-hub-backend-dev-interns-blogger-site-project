const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        lowercase:true
    },
    content:String,
    slug:String,
    image:{
        filename:String,
        url:String
    },
    Author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    },
    Likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    Comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    blockedPost:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'

    }],
    Views:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    Private:{
        isPrivate:{
            type:Boolean,
            default:false
        }
    },
    schedule:{
        isScheduled:{
            type:Boolean,
            default:false
        },
        date:Date
    },
    reported:{
        reportedStatus:false,
        reason:String
    }

},
{timestamps:true}
);

const Post=new mongoose.model('Post',postSchema);

module.exports={
    Post
}