require('dotenv').config();

const jwt=require("jsonwebtoken");

const duration=5*60;

async function tokenCreation(user){
   return jwt.sign({user},process.env.JWT_SECRET,{expiresIn:duration})
}

module.exports={
    tokenCreation
}