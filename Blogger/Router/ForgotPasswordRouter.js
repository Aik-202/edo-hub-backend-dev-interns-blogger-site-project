const express=require('express');
const path=require('path');
const ForgetPasswordControllerFile= require(path.join(__dirname,'..','Controller','ForgotPassword.Controller.js'));

const forgetPasswordRouter=express.Router();


forgetPasswordRouter.get('/',ForgetPasswordControllerFile.getForgetPassword);

forgetPasswordRouter.post('/',ForgetPasswordControllerFile.PostForgetPassword);

module.exports={
    forgetPasswordRouter,
}
