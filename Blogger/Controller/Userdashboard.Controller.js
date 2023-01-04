const path=require('path');

const {User}=require(path.join(__dirname,'..','Model','user.model'));

async function userDashboard(req,res){
    const loggedIn=req.session.userId;
    User.findOne({_id:loggedIn},{password:0},function(error,userDetails){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:"An error occurred while processing your request, please try again"
            })
        }else{
            console.log(userDetails)
            res.render('User_dashboard',{userDetails})

        }
    })

}

async function updateUserInfo(req,res){

}

async function deleteOwnDashboard(req,res){
   try{
     User.deleteOne({_id:req.session.userId})
    .then(()=>{
        res.status(200)
        .json({
            success:true,
            error:[],
            message:"Dashboard deleted successfully",
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
    userDashboard,
    updateUserInfo,
    deleteOwnDashboard
}