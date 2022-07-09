const express=require('express');
const path=require('path');

const LoginControllerFile= require(path.join(__dirname,'..','Controller','Login.Controller.js'));

const LoginRouter=express.Router();

LoginRouter.get('/',LoginControllerFile.LoginRouterGetFunction);

LoginRouter.post('/',LoginControllerFile.LoginRouterPostFunction);

module.exports={
    LoginRouter,
}
