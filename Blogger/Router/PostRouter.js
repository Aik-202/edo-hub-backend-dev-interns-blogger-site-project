const path=require('path');

const {postNewPosts,getPosts}=require(path.join(__dirname,'.','Controller','Post.Controller'));

const {AuthRoutes}=require(path.join(__dirname,'.','Router','Authentication','AuthRoutes'));

const express=require('express');

postRouter=express.Router();


postRouter.post('/posts/create/:title',AuthRoutes,postNewPosts);

postRouter.get('/posts/:username',AuthRoutes,getPosts);

module.exports={
    postRouter,
}