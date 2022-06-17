const express=require('express');

const RegisterControllerFile= require('../Controller/Register.Controller.js');

const RegisterRouter=express.Router();

RegisterRouter.get('/',RegisterControllerFile.RegisterRouterGetFunction)

RegisterRouter.post('/',RegisterControllerFile.RegisterRouterPostFunction)



module.exports={
    RegisterRouter,
}

