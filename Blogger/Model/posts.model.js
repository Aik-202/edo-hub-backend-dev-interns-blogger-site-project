const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
title:String,
slug:String,
author:String,
date:String,
content:String,
numberOfLikes:Number,
numberOfComments:Number
})


const Post=mongoose.model('Post',postSchema);

module.exports=Post;