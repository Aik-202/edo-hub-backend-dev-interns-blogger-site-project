const mongoose=require('mongoose');

const commentSchema= new mongoose.Schema({
    post:{
            type:mongoose.Schema.Types.ObjectId,
             ref:'Post'
    },
    commentor:{
       commentorInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
       },
       commentContent:String
    },
    commentParent:{
        originalPost:{
            type:Boolean,
            default:true
        },
        commentedUnder:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    },
    childCommentors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'

        }
    ]

},
{timestamps:true}
);

const Comment=mongoose.model('Comment',commentSchema);

module.exports={
    Comment
}