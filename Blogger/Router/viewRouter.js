const path=require('path');

const {postView, viewPost}=require(path.join(__dirname,'..','Controller','View.Controller'));

const {AuthRoutes}=require(path.join(__dirname,'..','Authentication','AuthRoutes'));

const express=require('express');

const viewRouter=express.Router();

viewRouter.post('/:username/:slug',AuthRoutes,postView);

viewRouter.get('/posts/:id/:username/:title',AuthRoutes,viewPost);

module.exports={viewRouter
};

