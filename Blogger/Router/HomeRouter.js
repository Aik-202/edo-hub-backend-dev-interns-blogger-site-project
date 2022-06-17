const express=require('express');

const HomeControllerFile= require('../Controller/Home.Controller.js');

const HomeRouter=express.Router();

HomeRouter.get('/',HomeControllerFile.HomeGetController);

module.exports={
    HomeRouter,
}

