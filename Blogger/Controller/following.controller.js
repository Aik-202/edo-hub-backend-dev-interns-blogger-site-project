const path=require('path');

const {User}=require(path.join(__dirname,'..','Model','user.model'));

async function followAuser (req,res){
   try{
    const {id}=req.params;
    User.updateOne({_id:req.session.userId},{$push:{following:id}})
    .then(()=>{
        User.updateOne({_id:id},{$push:{followers:req.session.userId}})
        .then(()=>{
            res.status(200)
     .json({
         success:true,
         error:[],
         message:"You have successfully followed this user",
         data:{}
     })
         })
    })
   }catch(error){
    res.status(400)
    .json({
        success:false,
        error:[
            {
                value:error.value,
                error:error.name,
                message:error.message
            }
        ],
        message:"An error occurred while processing your request",
        data:{}
    })
}

}

async function unFollowAUser (req,res){
    try{
     const {id}=req.params;
     User.updateOne({_id:req.session.userId},{$pull:{following:id}})
     .then(()=>{
         User.updateOne({_id:id},{$pull:{followers:req.session.userId}})
         .then(()=>{
            res.status(200)
     .json({
         success:true,
         error:[],
         message:"You have successfully unfollowed this user",
         data:{}
     })
         })

     })
    }catch(error){
     res.status(400)
     .json({
         success:false,
         error:[
             {
                 value:error.value,
                 error:error.name,
                 message:error.message
             }
         ],
         message:"An error occurred while processing your request",
         data:{}
     })
 }
 
 }

 async function getFollowers(req,res){
    try{
        const {id}=req.params;
    User.find({_id:id})
    .then((found)=>{
        res.status(200)
        .json({
            success:true,
            error:[],
            message:"followers fetched successfully",
            data:found
        })
    })
    }catch(error){
        res.status(400)
        .json({
            success:false,
            error:[
                {
                    value:error.value,
                    error:error.name,
                    message:error.message
                }
            ],
            message:"An error occurred while processing your request",
            data:{}
        })
    }
 }

 async function getListOfFollowing(req,res){
   try{
    const {id}=req.params;
    User.find({_id:id})
    .populate('following')
    .then((found)=>{
        res.status(200)
        .json({
            success:true,
            error:[],
            message:"followers fetched successfully",
            data:found
        })
    })
   }catch(error){
    res.status(400)
    .json({
        success:false,
        error:[
            {
                value:error.value,
                error:error.name,
                message:error.message
            }
        ],
        message:"An error occurred while processing your request",
        data:{}
    })
}
 }

 module.exports={
    followAuser,
    unFollowAUser,
    getFollowers,
    getListOfFollowing
 }