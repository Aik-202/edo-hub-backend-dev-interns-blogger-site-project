const path=require('path');

const {profile}=require(__dirname,'..','Model','profile.model.js');

async function uploadProfileDetails(req,res){
  const editedProfile=req.body;
  console.log(req.file);

}

module.exports={
    uploadProfileDetails
}