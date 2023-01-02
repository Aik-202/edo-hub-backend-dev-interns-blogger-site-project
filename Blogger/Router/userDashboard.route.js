const path=require('path');

const {userDashboard,updateUserInfo}=require(path.join(__dirname,'..','Controller','Userdashboard.controller'));

const {AuthRoutes}=require(path.join(__dirname,'..','Authentication','AuthRoutes'));

const userDashboardRoute=require('express').Router();

userDashboardRoute.get('/',userDashboard);

userDashboardRoute.patch('/',userDashboard);

module.exports={
    userDashboardRoute
}