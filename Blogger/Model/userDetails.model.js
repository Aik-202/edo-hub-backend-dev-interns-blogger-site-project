const path=require('path');
const dotenv=require('dotenv');
dotenv.config(path.join(__dirname,'.env'));

const mongoose=require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.TINA_NAME}:${process.env.TINA_PASS}@project1.d7tnf.mongodb.net/Blogdatabase?retryWrites=true&w=majority`);


const newUserSchema= new mongoose.Schema({
    fullName:{
        required:true,
        type:String,
    },
    emailAddress:{
        required:true,
        type:String,
        unique:true
    },
    userPassword:{
        required:true,
        type:String,
        minlength:8,
        maximumlength:16
    },
    autoGeneratedUserName:{
        required:true,
        type:String,
    }

})
const register=mongoose.model('User',newUserSchema);


module.exports={
    register
}