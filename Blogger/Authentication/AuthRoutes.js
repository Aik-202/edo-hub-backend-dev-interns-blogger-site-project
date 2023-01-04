const path=require('path');
const dotenv =require('dotenv')
dotenv.config('../.env');

const {User}=require(path.join(__dirname,'..','Model','user.model'));

const AuthRoutes=(req,res,next)=>{
    if(req.cookies){
    const validate=req.cookies.session;

    if(validate){
                next();
        }
        else{
        const today=new Date();
        const contentId=req.headers.cookie.split(';')[0]; 
        const newContentId=contentId.split('value=')[1];

        User.findOne({_id:newContentId,'loggedOut.isLoggedOut':true})
        .then((found)=>{
          if(found){
            res.redirect('/Login')

          }else{
            found.loggedOut.isLoggedOut=true;
            found.loggedOut.date=today;
            found.save()
            .then((logged)=>{
              res.redirect('/Login')
            })

          }
        })
        
          // User.updateOne({_id:newContentId},{$set:{'loggedIn.isLoggedIn':false,'loggedIn.date':'','loggedOut.isLoggedOut':true,'loggedOut.date':today}})
          // .then(()=>{
     
          // })
        
        
        }
        
    }
else{
    res.redirect('/Login')
}
}


module.exports={
    AuthRoutes,
}

