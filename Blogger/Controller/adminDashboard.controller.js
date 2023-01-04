const path=require('path');

const {User}=require(path.join(__dirname,'..','Model','user.model'));

async function adminDashboard(req,res){
    const loggedIn=req.session.userId;
    User.findOne({_id:loggedIn},{password:0},function(error,userDetails){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:"An error occurred while processing your request, please try again"
            })
        }else{
            User.find({Admin:false}).populate({
                path:'bookMark',
                populate:{
                    path:'Author',
                    select:'-password',
                },
                populate:{
                    path:'Comments',
                    populate:{
                        path:'commentor.commentorInfo',
                        select:'-password'
                    },
                    populate:{
                        path:'commentParent.commentedUnder'
                    },
                    populate:{
                        path:'childCommentors',
                        select:'-password'
                    }


                }
            }).populate({
                path:'following',
                select:'-password'
            }).populate({
                path:'followers',
                select:'-password'
            })
            .populate({
                path:'post',
                populate:{
                    path:'Author',
                    select:'-password',
                },
                populate:{
                    path:'Comments',
                    populate:{
                        path:'commentor.commentorInfo',
                        select:'-password'
                    },
                    populate:{
                        path:'commentParent.commentedUnder'
                    },
                    populate:{
                        path:'childCommentors',
                        select:'-password'
                    }


                }
            }).then((userInfo)=>{
                res.render('Admin_dashboard',{  admin:userDetails,
                users:userInfo
                })
                console.log(userDetails + 'jfm'+userInfo)
            })

           

        }
    })

}

module.exports={
    adminDashboard
}