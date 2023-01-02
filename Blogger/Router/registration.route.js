const path=require('path');

const {getRegistrationForm,createAnAccount}=require(path.join(__dirname,'..','Controller','Register.controller'));

const {body}=require('express-validator');

const registration=require('express').Router();

registration.get('/',getRegistrationForm);

registration.post('/',[
    body('name').trim().notEmpty().withMessage('The name field cannot be empty'),
    body('email').trim().isEmail().withMessage('Must be an Email address'),
    body('user_password').trim().notEmpty().withMessage('The password field cannot be empty')
    .isLength({
        min:8,
        max:16
    }).withMessage('expected minimum length is 8 while maximum value is 16')
],createAnAccount)

module.exports={
    registration
}