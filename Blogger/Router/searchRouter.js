const path=require('path');

const searchController=require(path.join(__dirname,'..','Controller','search.Controller'));

const {AuthRoutes}=require(path.join(__dirname,'..','AuthenticationMiddleWare','AuthRoutes.js'));

const express=require('express');

const searchRouter=express.Router();

searchRouter.get('/:id',AuthRoutes,searchController.getUserProfile);

module.exports={
    searchRouter
}