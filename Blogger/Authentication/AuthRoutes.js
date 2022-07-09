const path=required('path');
const dotenv =require('dotenv')
dotenv.config('../.env');

const AuthRoutes=(req,res,next)=>{
    if(req.cookies){
    const validate=req.cookies.blog;

    if(validate){
                next();
        }
        else{
            res.redirect('/Login')
        }
        
    }
else{
    res.redirect('/Login')
}
}


module.exports={
    AuthRoutes
}

