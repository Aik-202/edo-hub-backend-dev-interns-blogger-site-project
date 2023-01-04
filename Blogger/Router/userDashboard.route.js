const path=require('path');

const {userDashboard,updateUserInfo,deleteOwnDashboard}=require(path.join(__dirname,'..','Controller','Userdashboard.controller'));

const {AuthRoutes}=require(path.join(__dirname,'..','Authentication','AuthRoutes'));

const userDashboardRoute=require('express').Router();

userDashboardRoute.get('/',userDashboard);

userDashboardRoute.patch('/',updateUserInfo);

userDashboardRoute.delete('/',deleteOwnDashboard);

module.exports={
    userDashboardRoute
}