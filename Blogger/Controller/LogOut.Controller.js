const path=require('path');
function getLogOut(req,res){
    res.clearCookie('blog');
    req.session.destroy((error)=>{
        if(error){

           console.log(error);
        }
        res.redirect('/Login')
    });
  
}
module.exports={
    getLogOut,
}