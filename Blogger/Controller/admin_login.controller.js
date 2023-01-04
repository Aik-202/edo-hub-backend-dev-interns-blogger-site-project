const path=require('path');
const {User}=require(path.join(__dirname,'..','Model','user.model'));
const bcrypt=require('bcrypt');
const { validationResult } = require('express-validator');

async function getLoginForm(req,res){
    return res.sendFile(path.join(__dirname,'..','Client','public','Admin_login_page.html'));

}

async function loginDashboard(req,res){
    const errors=validationResult(req);
    if(errors.isEmpty()){
        const {username,user_password}=req.body;
        User.findOne({username:username,Admin:true},async function(error,found){
            if(error){
                res.status(500).json({
                    success:false,
                    error:[],
                    message:"An error occurred while processing your request, please try again",
                    data:{}
                })
            }else if(found){
                const foundUser=await bcrypt.compare(user_password,found.password);
                if (foundUser){
                    const today=new Date();
                    res.cookie('value',`${found._id}`,{maxAge:1000*60*60*24*6,httpOnly:true});
                    User.update({_id:found._id},{$set:{'loggedIn.isLoggedIn':true,'loggedIn.date':today,'loggedOut.isLoggedOut':false,'loggedOut.date':''}})
                    .then(()=>{
                    req.session.userId=found._id;
                    req.session.user_name=found.username;
                    res.redirect('/admindashboard');

                    })
                    
                   
                }else{
                    res.status(400).json({
                        success:false,
                        error:[],
                        message:"Invalid user credentials",
                        data:{}
                    })
                }
    
            }else{
                res.status(404).json({
                    success:false,
                    error:[],
                    message:"Invalid user credentials",
                    data:{}
                })
            }
    
        });
    }else{
        res.status(422).json({
            success:false,
            error:errors.array(),
            message:"Invalid input",
            data:{}
        })
    }

}

module.exports={
    getLoginForm,
    loginDashboard

}