const path=require('path');
function getAdminDashboard(req,res){
    req.session.destroy((error)=>{
        if(error){

           console.log(error);
        }
        res.sendFile(path.join(__dirname,'..','Client','public','Admin_dashboard.html'));
    });
  
}
module.exports={
    getAdminDashboard,
}