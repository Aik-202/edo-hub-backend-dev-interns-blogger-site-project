const path=require('path');
const multer=require('multer');

const {storage}=require(path.join(__dirname,'..','Cloudinary','cloudinary.config.js'));
const upload=multer({storage:storage});



const {AuthRoutes}=require(path.join(__dirname,"..","Authentication","AuthRoutes.js"));

const {uploadProfileDetails}=require(path.join(__dirname,"..","Controller","updateProfile.Controller.js"));

const express=require('express');

const updateProfile=express.Router();

updateProfile.post('/',AuthRoutes,upload.single('profileImage'),uploadProfileDetails);

module.exports={
    updateProfile
}