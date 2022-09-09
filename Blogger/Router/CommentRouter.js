const path=require('path');

const {createCommentUnderMainPost,createCommentUnderAComment}=require(path.join(__dirname,'..','Controller','Comment.Controller'));

const {AuthRoutes}=require(path.join(__dirname,'..','Authentication','AuthRoutes'));


const express=require('express');

const commentRouter=express.Router();

commentRouter.get('/',AuthRoutes);

commentRouter.post('/comments/:slug/:commentdate/:commentcontent',AuthRoutes,createCommentUnderMainPost);

commentRouter.post('/comments/:slug/:commentdate/:commentcontent/:parentUsername',AuthRoutes,createCommentUnderAComment)

module.exports=commentRouter;