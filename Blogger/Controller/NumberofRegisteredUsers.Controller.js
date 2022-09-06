const path=require('path');

const {register}=require(path.join(__dirname,'..','Model','userDetails.model.js'));

async function totalUsers(req,res){
    await register.find({},function(error,result){
        let totalRegistered=0;
        if(error){
            console.log(`this error: ${error} was produced`);
        }
    
        else{
            if(result.length!=0){
                for(let i;i<result.length;i++){
                    totalRegistered+=1;
                }
            }
        }
    
    
    })
    
}



module.exports={
    totalUsers
}
