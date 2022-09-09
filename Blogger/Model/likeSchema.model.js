const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    post:{
        id: mongoose.Types.ObjectId,
        title:String
    },
    user:{
        likedBy:String
    }
})

const totalLikeSchema=new mongoose.Schema({
    post:{
        id: mongoose.Types.ObjectId,
        slug:String
    },
    totalLike:{
        type:Number,
        default:0,
    }
})

const Like=mongoose.model('Like',likeSchema);

const Likes=mongoose.model('Like',totalLikeSchema);

module.exports={
    Like,
    Likes
}