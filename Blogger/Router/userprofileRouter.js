const path=require('path');
const multer=require('multer');

const {storage}=require(__dirname,'..','Cloudinary','cloudinary.config.js');
const upload=multer({storage:storage});



const {AuthRoutes}=require(path.join(__dirname,"..","Authentication","AuthRoutes.js"));

const {uploadProfileDetails}=require(path.join(__dirname,"..","Controller","updateProfile.Controller.js"));

const express=require('express');

const updateProfile=express.Router();

UpdateProfile.post('/:id',AuthRoutes,uploadProfileDetails,upload.single('profileImage'));

module.exports={
    updateProfile
}