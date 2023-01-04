const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        lowercase:true
    },
    profileImage:{
        filename:String,
        url:String

    },
    emailAddress:{
        type:String
    },
    username:{
        type:String

    },
    about:String,
    password:String,
    Admin:{
        type:Boolean,
        default:false
    },
    bookMark:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'

    }],
    suspended:[{
        isSuspended:{
            type:Boolean,
            default:false
        },
        suspensionEnds:{
            type:Date
        }
    }],
    blockedUsers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    }],
    blocked:{
        type:Boolean,
        default:false
    },
    loggedIn:{
        isLoggedIn:{
            type:Boolean,
            default:true
        },
        date:Date
    },
    loggedOut:{
        isLoggedOut:{
            type:Boolean,
            default:false
        },
        date:Date
    }
},
{timestamps:true})

const User=mongoose.model('User',userSchema);

module.exports={
    User
}
