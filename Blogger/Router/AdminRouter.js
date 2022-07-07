const express=require('express');
const path=require('path');

const adminController=require(path.join(__dirname,'..','Controller','Admin.Controller.js'));

const adminRouter=express.Router();

adminRouter.get('/',adminController.getAdminDashboard);

module.exports={
    adminRouter,
}
