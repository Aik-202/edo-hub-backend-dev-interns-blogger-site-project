const mongoose=require('mongoose');

const viewBySchema=new mongoose.Schema({
    post:{
        id: mongoose.Types.ObjectId,
        slug:String
    },
    viewedBy:String

})

const viewsCount=new mongoose.Schema({
    post:{
        id: mongoose.Types.ObjectId,
        slug:String
    },
    counts:{
        type:Number,
        default:0

    }
})

const View=mongoose.model('View',viewBySchema);

const viewCount=mongoose.model('viewCount',viewsCount);

module.exports={
    View,
    viewCount
}