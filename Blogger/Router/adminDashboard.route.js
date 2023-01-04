const path=require('path');

const { adminDashboard}=require(path.join(__dirname,'..','Controller','adminDashboard.controller'));
const {AuthRoutes}=require(path.join(__dirname,'..','Authentication','AuthRoutes'));

const adminDashboardRoute=require('express').Router();

adminDashboardRoute.get('/', adminDashboard);

module.exports={
    adminDashboardRoute
}