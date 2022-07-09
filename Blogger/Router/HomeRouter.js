const express=require('express');
const path=require('path');

const HomeControllerFile= require(path.join('..','Controller','Home.Controller.js'));

const HomeRouter=express.Router();

HomeRouter.get('/',HomeControllerFile.HomeGetController);

module.exports={
    HomeRouter,
}

