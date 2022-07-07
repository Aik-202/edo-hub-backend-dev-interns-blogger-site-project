const path=require('path');
const authenticate=(req,res,next)=>{
    if(req.session.Login){
        console.log(req.session.Login)
        next ();
    }
    else{
        res.redirect('/Login');
    }
}

function getUserDashboard(req,res){
res.sendFile(path.join(__dirname,'..','..','Client','public','User_dashboard.html'));
}
module.exports={
    getUserDashboard,
    authenticate,
}