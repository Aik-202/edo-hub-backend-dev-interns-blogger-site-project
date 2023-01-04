const path=require('path');

const {confirmEmail,sendChangePasswordToken,changePassword,submitNewPassword}=require(path.join(__dirname,'..','Controller','forgot_password.controller'));

const {body}=require('express-validator');

const forgotPasswordRouter=require('express').Router();

forgotPasswordRouter.get('/emailconfirmation',confirmEmail);

forgotPasswordRouter.post('/emailconfirmation',[
    body('email').trim().isEmail().withMessage('Must be an Email address')
],sendChangePasswordToken)

forgotPasswordRouter.get('/password/reset/:token/:id',changePassword);

forgotPasswordRouter.post('/password/reset/:token/:id',[
    body('new_password').trim().notEmpty().withMessage('The password field cannot be empty')
    .isLength({
        min:8,
        max:16
    }).withMessage('expected minimum length is 8 while maximum value is 16'),
    body('confirm_password').trim().notEmpty().withMessage('The password field cannot be empty')
    .isLength({
        min:8,
        max:16
    }).withMessage('expected minimum length is 8 while maximum value is 16')
],submitNewPassword);

module.exports={
    forgotPasswordRouter
}