const path=require('path');

const {User}=require(path.join(__dirname,'..','Model','user.model'));

const {Post}=require(path.join(__dirname,'..','Model','Post.model'));

async function blockUser(req,res){
   try{
    const {id}=req.params
    User.updateOne({_id:req.session.userId},{$push:{blockedUsers:id}})
    .then(()=>{
        res.satus(200).json({
            success:true,
            error:[],
            message:"You have successfully blocked this user",
            data:{}
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

async function unBlockUser(req,res){
    try{
        const {id}=req.params
     User.updateOne({_id:req.session.userId},{$pull:{blockedUsers:id}})
     .then(()=>{
        res.status(200).json({
            success:true,
            error:[],
            message:"You have successfully unblocked this user",
            data:{}
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
    unBlockUser,
    blockUser
 }