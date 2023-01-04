const path=require('path');
const dotenv =require('dotenv')
dotenv.config('../.env');

const {User}=require(path.join(__dirname,'..','Model','user.model'));

async function logOut(req,res){
          res.clearCookie('session');
       
          req.session.destroy((error)=>{
              if(error){
      
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
              else{
                
          const today=new Date();
          const contentId=req.headers.cookie.split(';')[0]; 
          const newContentId=contentId.split('value=')[1];
          User.findOne({_id:newContentId},{'loggedIn.isLoggedIn':true})
          .then((alreadyLoggedOut)=>{
            if(alreadyLoggedOut){
                res.redirect('/Login')

            }else{
                User.findOneAndUpdate({_id:newContentId},{$set:{'loggedIn.isLoggedIn':false,'loggedIn.date':'','loggedOut.isLoggedOut':true,'loggedOut.date':today}},{new:true})
          .then((boss)=>{
            res.redirect('/Login')
          })
            }

          })
              }
          });
        
        
        }
    
module.exports={
    logOut
}