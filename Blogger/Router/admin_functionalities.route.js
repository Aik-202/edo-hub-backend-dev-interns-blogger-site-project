const path=require('path');


const {body}=require('express-validator');
const { admin } = require('googleapis/build/src/apis/admin');

const {getLoginForm,loginDashboard}=require(path.join(__dirname,'..','Controller','admin_login.controller'));

const {notLoggedInForSevenOrMoreDays,blockedByAdmin,unblockByAdmin,deleteAUser,reportedPost,DeleteReportedPost,currentlyLoggedIn,loggedOutUsers,readAdminPost,adminsPost,getAdminPost}=require(path.join(__dirname,'..','Controller','admin_to_user_functions.controller'));

const adminRoute=require('express').Router();

// `admin/posts/${adminPost._id}/${adminPost.title}/${adminPost.Author}`

adminRoute.get('/',getLoginForm);

adminRoute.get('/posts',getAdminPost);

adminRoute.get('/posts/:id/:title/:author',readAdminPost);

adminRoute.get('/loggedout',notLoggedInForSevenOrMoreDays);

adminRoute.patch('/users/block/:id',blockedByAdmin);

adminRoute.patch('/users/unblock/:id',unblockByAdmin);

adminRoute.delete('/users/:id',deleteAUser);

adminRoute.get('/posts/reported',reportedPost);

adminRoute.delete('/posts/reported/:id',DeleteReportedPost);

adminRoute.get('/users/loggedout',loggedOutUsers);

adminRoute.get('/users/loggedin',currentlyLoggedIn);

adminRoute.post('/posts/create',[
    body('title').trim().notEmpty().withMessage('The field cannot be empty'),
    body('content').trim().notEmpty().withMessage('The content field cannot be empty')],adminsPost);

adminRoute.post('/login',[
    body('username').trim().notEmpty().withMessage('The username field cannot be empty'),
    body('user_password').trim().notEmpty().withMessage('The password field cannot be empty')
],loginDashboard);

module.exports={
    adminRoute
}