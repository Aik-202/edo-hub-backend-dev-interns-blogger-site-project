const path=require('path');
const dotenv=require('dotenv');
dotenv.config(path.join(__dirname,".env"));

const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name:process.env.CLIENT_NAME,
    api_key:process.env.API,
    api_secret:process.env.CLIENT_SECRET

})

const storage=new CloudinaryStorage({
   cloudinary,
   params:{
    folder:"blogger",
    allowedFormat:['jpeg','jpg','png'],

   }
})

module.exports={
    storage,
    cloudinary
}
