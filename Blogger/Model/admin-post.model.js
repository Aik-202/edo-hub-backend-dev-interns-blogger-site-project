const mongoose=require('mongoose');

const postAdminSchema=new mongoose.Schema({
    title:{
        type:String,
        lowercase:true
    },
    content:String,
    slug:String,
    image:{
        filename:String,
        url:String
    },
    Author:{
        type:String

    },
    Likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    Comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    Views:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    read:[{
        status:{
            type:Boolean,
             default:false

        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }]

},
{timestamps:true}
);

const Admin=new mongoose.model('Admin',postAdminSchema);

module.exports={
   Admin
}