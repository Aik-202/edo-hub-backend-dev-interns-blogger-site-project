const path=require('path');

const {google}=require('googleapis');

const bcrypt=require('bcrypt');

const {User}=require(path.join(__dirname,'..','Model','user.model'))


const {tokenCreation}=require(path.join(__dirname,'..','Authentication','JWT'));

const jwt=require('jsonwebtoken');

const nodemailer=require('nodemailer');
const { validationResult } = require('express-validator');
const e = require('express');

async function confirmEmail(req,res){
    res.locals.email="";
    res.render('email_confirmation');
   


}

const oAuth2Client=new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,'https://developers.google.com/oauthplayground');

oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})

async function sendEmail(user,token){
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

        const newUsername=user.username;
         const usernameToUpperCase=newUsername.toUpperCase();
    
        const mailOptions={
            from:`BLOGGER<${process.env.USER_EMAIL}>`,
            to:user.emailAddress,
            subject:'Your Account was created successfully',
            html:`Hey ${usernameToUpperCase},<br><br>A password reset for your account was requested.<br>Please click the link below to change your password <br>Note that this link is valid for 5minutes. After the time limit has expired, you will have to resubmit the request for a password reset.<br><a href=http://localhost:8000/password/reset/${token}/${user._id}>${token}</a>`,
        }
        transport.sendMail(mailOptions)
        


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

async function  sendChangePasswordToken(req,res){
    const {email}=req.body;
    const errors=validationResult(req);

    if(errors.isEmpty()){
        User.findOne({emailAddress:email})
        .then(async (user)=>{
         const tokenFormed=await tokenCreation(user._id);

         jwt.verify(tokenFormed,process.env.JWT_SECRET,(error,decoded)=>{
            if(error){
                res.status(400)
                .json({
                    success:false,
                    error:error,
                    message:"An error occurred",
                    data:{}
                })
            }else{
                
           sendEmail(user,tokenFormed)
            res.locals.email="An email has been sent to your mail, please check your mail";
            res.render('email_confirmation');

            }
         })
        })
    }else{
        res.status(422)
        .json({
            success:false,
            error:errors.array(),
            message:"Invalid input",
            data:{}
        })
    }

}

async function changePassword(req,res){
    const {token,id}=req.params;
    jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{
        if(error){
            res.status(400).json({
                success:false,
                error:error,
                message:"Token expired",
                data:{}

            })
        }else if(decoded){
        //    res.locals.changedPassword=""; 
        //    res.locals.tokens=token;
        //    res.locals.ids=id;
        //    res.render('Forgot_password');
        res.status(200).json({
            id:id,
            token:token
        })
        }

    })
}

async function submitNewPassword(req,res){
    const {confirm_password,new_password}=req.body;
    const {id}=req.params;
    const errors=validationResult(req);
    if(errors.isEmpty()){
     if(confirm_password!=new_password){
        res.status(400).json({
            success:false,
            error:[
               {
                value:`${new_password}`,
                msg:"The new_password field doesn't match the value entered into the confirm_password field",
                param:'new_password',
                location:"body"
               },
               {
                value:`${confirm_password}`,
                msg:"The confirm_password field doesn't match the value entered into the new_password field",
                param:'confirm_password',
                location:"body"
               }
            ],
            message:"Invalid input",
            data:{}

  
        })

     }else{
        const newPassword=await bcrypt.hash(new_password,10);
        User.updateOne({_id:id},{$set:{password:newPassword}});
        res.locals.changedPassword="Password changed successfully";
        res.render('Forgot_password');



     }
    }else{
        res.status(422)
        .json({
            success:false,
            error:errors.array(),
            message:"Invalid input",
            data:{}
        })

    }

}

module.exports={
    confirmEmail,
    sendChangePasswordToken,
    changePassword,
    submitNewPassword
}