const express=require('express');
const path=require('path');
const ForgetPasswordControllerFile= require(path.join(__dirname,'..','Controller','ForgetPassword.Controller.js'));

const forgetPasswordRouter=express.Router();


forgetPasswordRouter.get('/',ForgetPasswordControllerFile.getForgetPassword);

forgetPasswordRouter.post('/',ForgetPasswordControllerFile.PostForgetPassword);

module.exports={
    forgetPasswordRouter,
}
