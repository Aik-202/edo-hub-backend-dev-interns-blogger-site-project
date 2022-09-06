const path=require('path');

const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    profile:{
     url:{
        type:String
     },
     fileName:{
        type:String
     }

    },
    Fullname:String,
    About:String
})

const profile=mongoose.model('Profile',schema);

module.exports={
    profile,
}