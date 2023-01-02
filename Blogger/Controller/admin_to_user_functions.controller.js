require('dotenv').config();

const path=require('path');

const nodemailer=require('nodemailer');

const {google}=require('googleapis');

const {User}=require(path.join(__dirname,'..','Model','user.model'));

const { validationResult } = require('express-validator');

const {Post}=require(path.join(__dirname,'..','Model','Post.model'));

const {Admin}=require(path.join(__dirname,'..','Model','admin-post.model'));

async function blockedByAdmin(req,res){
    try{
    const {id}=req.params;
    User.updateOne({_id:id},{$set:{blocked:true}})
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

async function unblockByAdmin(req,res){
    try{
        const {id}=req.params;
        User.updateOne({_id:id},{$set:{blocked:false}})
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

async function notLoggedInForSevenOrMoreDays(req,res){
    const days =1000*60*60*24;
    const today=new Date();
    User.find({'loggedOut.isLoggedOut':true},{password:0})
    .populate({
        path:'Author',
        populate:{
            path:'bookMark'
        },
        populate:{
            path:'following'
        },
        populate:{
            path:'followers'
        },
        populate:{
            path:'post'
        }
    }).populate('Likes')
    .populate('Comments')
    .populate('blockedPost')
    .populate('Views')
    .then((loggedOutUsers)=>{
    //    const sevenDaysOrGreater=loggedOutUsers.filter(async (user)=>{
    //    const dateMil=new Date (user.loggedOut.date);
    //    const dateDiff=today-dateMil;
    //    const dateIndays=dateDiff/days;
    //    if(dateIndays>=7){
    //     return true
    //    }

    //    }) 
    const notLoggedIn=[];
    loggedOutUsers.forEach((first)=>{
        const today=new Date();
        const firstDate=first.loggedOut.date;
        const oneDay=1000*60*60*24;
        const cal=today-firstDate;
        const calFirst=cal/oneDay;
        if(calFirst>=7){
            notLoggedIn.push(first)
        }


    })

       res.status(200).json({
        success:true,
        error:[],
        message:"List of Users who have been logged out for seven or more days fetched successfully",
        data:notLoggedIn,
       })

    })
}

async function deleteAUser(req,res){
    const {id}=req.params;
    User.deleteOne({_id:id})
    .then(()=>{
        res.status(200).json({
            success:true,
            error:[],
            message:"User deleted successfully",
            data:{}
           })
    })
}

async function reportedPost(req,res){
    Post.find({'reported.reportedStatus':true})
    .populate({
        path:'Author',
        populate:{
            path:'bookMark'
        },
        populate:{
            path:'following'
        },
        populate:{
            path:'followers'
        },
        populate:{
            path:'post'
        }
    }).populate('Likes')
    .populate('Comments')
    .populate('blockedPost')
    .populate('Views')
    .then((users)=>{
        res.status(200).json({
            success:true,
            error:[],
            message:"All reported posts fetched successfully",
            data:{}
           })

    })
}

async function DeleteReportedPost(req,res){
    const {id}=req.params;
    Post.findOneAndDelete({_id:id,'reported.reportedStatus':true})
    .then((users)=>{
        res.status(200).json({
            success:true,
            error:[],
            message:"reported post deleted successfully",
            data:{}
           })

    })
}

async function currentlyLoggedIn(req,res){
User.find({'loggedIn.isLoggedIn':true})
.then((totalNumberOfLoggedIn)=>{
    const totalLoggedIn=totalNumberOfLoggedIn.length;
    res.status(200)
    .json({
        success:true,
        error:[],
        message:"Total number of loggedIn users fetched successfully",
        data:totalLoggedIn
    })

})
}

async function loggedOutUsers(req,res){
    User.find({'loggedIn.isLoggedIn':false}).populate({
        path:'Author',
        populate:{
            path:'bookMark'
        },
        populate:{
            path:'following'
        },
        populate:{
            path:'followers'
        },
        populate:{
            path:'post'
        }
    }).populate('Likes')
    .populate('Comments')
    .populate('blockedPost')
    .populate('Views')
    .then((totalNumberOfLoggedIn)=>{
        res.status(200)
        .json({
            success:true,
            error:[],
            message:"Users who are not currently logged in Fetched Successfully",
            data:totalNumberOfLoggedIn
        })
    })
    }

    //EMAIL SENDING OPERATIONS

    const oAuth2Client=new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,'https://developers.google.com/oauthplayground');

    oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})

    async function sendEmail(users,admin){
        try{
            const accessToken=await oAuth2Client.getAccessToken();
            const transport=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    type:'OAuth2',
                    user:process.env.USER_EMAIL,
                    accessToken:accessToken,
                    clientId:process.env.CLIENT_ID,
                    clientSecret:process.env.CLIENT_SECRET,
                    refreshToken:process.env.REFRESH_TOKEN
                   

                }
            })
           users.forEach( async(user)=>{

            const date=admin.createdAt.toDateString();
        
            const mailOptions={
                from:`BLOGGER<${process.env.USER_EMAIL}>`,
                to:user.emailAddress,
                subject:'A New Post Has Been Uploaded By The Admin',
                html:`TIME:${date}<br>${admin.content} &nbsp; <br><a href=admin/posts/${admin._id}/${admin.title}/${admin.Author}>google</a>`,
            }
            transport.sendMail(mailOptions)
            
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

    async function adminsPost(req,res){
        try{
           const errors=validationResult(req);
           if(errors.isEmpty()){
            const {title,content}=req.body;
            const adminPost=new Admin({
                title:title,
                content:content,
                Author:'Admin'
               
            })
            adminPost.slug=`/admin/posts/${adminPost._id}/${adminPost.title}/${adminPost.Author}`;
            adminPost.save();
            User.find({},{password:0})
            .then(async(users)=>{
                const admin=adminPost
               await sendEmail(users,admin)
               .then(()=>{
                res.status(200)
                .json({
                    success:true,
                    error:[],
                    message:"users successfully notified",
                    data:{}
                })
               })
                
  

            })
           }else{
            res.status(422).json({
                success:false,
                error:errors.array(),
                message:"Invalid input",
                data:{}
            })
           }
       


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

    async function  readAdminPost(req,res){
        try{
            const {id,title,author}=req.params;
            Post.updateOne({_id:id,title:title,Author:author},{$set:{'read.status':true,$push:{'read.userId':req.session.userId}}})
              
        
         
        
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

    async function getAdminPost(req,res){
      try{
        const readAdminPosts=[];
        const  notYetRead=[];
        Admin.find({})
        .then((found)=>{
            found.forEach((post)=>{
                if(found.read.status==true){
                    readAdminPosts.push(post)
    
                }else if(found.read.status==false){
                    notYetRead.push(post)
                }
            })
        })
        res.status(200)
        .json({
            success:true,
            error:[],
            message:"Admins post fetched successfully",
            data:{
                readAdminPosts,
                notYetRead
            }
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
    unblockByAdmin,
    notLoggedInForSevenOrMoreDays,
    blockedByAdmin,
    getAdminPost,
    deleteAUser,
    reportedPost,
    adminsPost,
    readAdminPost,
    DeleteReportedPost,
    currentlyLoggedIn,
    loggedOutUsers
    
}