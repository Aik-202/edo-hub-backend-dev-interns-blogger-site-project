const path=require('path');

const mongoose=require('mongoose');

const schema=new mongoose.Schema({
      path:{
        type:String,
        default:''
      },
      filename:{
        type:String,
        default:''
      },
      fullName:{
        type:String,
        default:''
      },
      about:{
        type:String,
        default:''
      },
      userId:{
        type: mongoose.Schema.Types.ObjectId,
        default:0
      }
})

const profile=mongoose.model('Profile',schema);

module.exports={
    profile,
}