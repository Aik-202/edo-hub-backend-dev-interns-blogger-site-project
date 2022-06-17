require('dotenv').config()
const express=require('express');

const bodyParser=require('body-parser');

const path=require('path');

const app=express();

const LoginRouterFile=require('./Router/LoginRouter');

const HomeRouterFile=require('./Router/HomeRouter');

const RegisterRouterFile=require('./Router/RegisterRouter');

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.json());

//app.set('view engine','hbs');
//app.set('views', path.join(__dirname,'..','Client','views'));
app.use('/Home',express.static(path.join(__dirname,'..','Client','public')));

app.use('/Login',LoginRouterFile.LoginRouter);

app.use('/Home',HomeRouterFile.HomeRouter);

app.use('/Register',RegisterRouterFile.RegisterRouter);


app.listen('5000',()=>{
    console.log('server running');
});