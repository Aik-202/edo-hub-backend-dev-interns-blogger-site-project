const express=require('express');

const {check,validationResult}=require('express-validator');

const path=require('path');

const RegisterControllerFile= require(path.join(__dirname,'..','Controller','Register.Controller.js'));

const RegisterRouter=express.Router();

RegisterRouter.get('/',RegisterControllerFile.RegisterRouterGetFunction)

RegisterRouter.post('/',[
    check('email','Invalid Email').isEmail(),
    check('user_password','Please, enter a password that is greater than 8 and less than 16 characters').isLength({
        min:8,
        max:16
    })
],RegisterControllerFile.RegisterRouterPostFunction)
  
  module.exports={
    RegisterRouter,
}

