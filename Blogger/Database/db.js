require('dotenv').config();

const mongoose=require('mongoose');

const mongodbLink=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@api.hceizp4.mongodb.net/blogDatabase?retryWrites=true&w=majority`;

  connectedDB= mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@api.hceizp4.mongodb.net/blogDatabase?retryWrites=true&w=majority`);


module.exports={
    connectedDB,
    mongodbLink
}