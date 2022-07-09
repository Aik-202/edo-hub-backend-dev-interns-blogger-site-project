const express=require('express');
const path=require('path');

const userController=require(path.join(__dirname,'..','Controller','Userdashboard.Controller.js'));


const userRouter=express.Router();

userRouter.get('/',userController.authenticate,userController.getUserDashboard);

module.exports={
    userRouter,
}