const path=require('path');

const userModel=require(path.join(__dirname,'..','Model','userDetails.model.js'));

const accessUserModel=userModel.register;

function getUserProfile(req,res){
    const searchForUser=req.query.user;

   try{
    if(searchForUser){
        accessUserModel.find({},(error,usersWithSpecifiedName)=>{
            if(error){
                console.log(error)
            }
            else{
                if(usersWithSpecifiedName.length!=0){
                    const nameValueArray=[];
                   for(let i=0;i<usersWithSpecifiedName.length;i++){
                       let nameValue=usersWithSpecifiedName[i].fullName;
                       const checkIfContained=nameValue.indexOf(searchForUser);
                       console.log(`usersfound${checkIfContained}`)
                       if(checkIfContained>=0){
                         const currentLoggedInUser=req.session.userNameIdentification;
                         console.log(`currentLoggedIn${currentLoggedInUser}`);
                         if(currentLoggedInUser!=nameValue){
                           nameValueArray.push(nameValue)
                         }
                       }
                       
                   }
                    res.render('/accounts',{nameValue});
                   //replace the res.send(nameValueArray) with a template code that sends this array (nameValueArray) to the frontend for display
                  
               }
            }
        })
    }
    else{
        res.json({
            message:'Unknown User'
        }).status(404)
    }
   }catch(err){
    console.log(`user profile: ${err}`);
}


}

module.exports={
    getUserProfile,
}

