const express=require('express');
const path=require('path');

const logOutController=require(path.join(__dirname,'..','Controller','LogOut.Controller.js'));

const logOutRouter=express.Router();

logOutRouter.get('/',logOutController.getLogOut);

module.exports={
    logOutRouter,
}
   

