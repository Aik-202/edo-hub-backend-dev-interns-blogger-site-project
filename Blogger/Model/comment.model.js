const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    mainPost:{
        id: mongoose.Types.ObjectId,
        slug:String
    },
    parentComment:{
        id: mongoose.Types.ObjectId,
        author:String
    },
    childComment:{
        date:Date,
        commentor:String,
        id: mongoose.Types.ObjectId,
        content:String
    }
})

const Comment=mongoose.model('Comment',commentSchema);

module.exports=Comment;


