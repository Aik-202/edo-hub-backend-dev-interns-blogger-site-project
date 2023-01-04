const path=require('path');


const {body}=require('express-validator');

const {getLoginForm,loginDashboard}=require(path.join(__dirname,'..','Controller','Login.controller'));

const loginRoute=require('express').Router();

loginRoute.get('/',getLoginForm);

loginRoute.post('/',[
    body('username').trim().notEmpty().withMessage('The username field cannot be empty'),
    body('user_password').trim().notEmpty().withMessage('The password field cannot be empty')
],loginDashboard);

module.exports={
    loginRoute
}