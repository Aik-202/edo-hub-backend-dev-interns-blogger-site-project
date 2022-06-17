const express=require('express');

const LoginControllerFile= require('../Controller/Login.Controller.js');

const LoginRouter=express.Router();

LoginRouter.get('/',LoginControllerFile.LoginRouterGetFunction);

LoginRouter.post('/',LoginControllerFile.LoginRouterPostFunction);

module.exports={
    LoginRouter,
}
