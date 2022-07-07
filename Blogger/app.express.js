const dotenv =require('dotenv')
dotenv.config('../.env');

const express=require('express');

const path=require('path');

const expressApi=express();



let count=0;

const expire=6*24*60*60*1000;

const session=require('express-session');

const connectMongodbSession=require('connect-mongodb-session')(session);

const mongodbLink=`mongodb+srv://${process.env.TINA_NAME}:${process.env.TINA_PASS}@project1.d7tnf.mongodb.net/Blogdatabase?retryWrites=true&w=majority`;

const mongoose=require('mongoose');

mongoose.connect(mongodbLink);

const store=new connectMongodbSession({
    uri:mongodbLink,
    collection:'sessionstores'
})


let sessionVar={
    secret:`${process.env.SECRET}`,
    resave:false,
    saveUninitialized:false,
    store:store,
    name:'blog',
    cookie:{
        maxAge:expire,
        sameSite: 'lax',
    }
}
if (expressApi.get('env') === 'production') {
    expressApi.set('trust proxy', 1) // trust first proxy
    sessionVar.cookie.secure = true // serve secure cookies
}

expressApi.use(session(sessionVar));


console.log(expire)
const bodyParser=require('body-parser');



const LoginRouterFile=require(path.join(__dirname,'.','Router','LoginRouter'));

const HomeRouterFile=require(path.join(__dirname,'.','Router','HomeRouter'));

const RegisterRouterFile=require(path.join(__dirname,'.','Router','RegisterRouter'));

const UserDashBoardRouterFile=require(path.join(__dirname,'.','Router','UserDashBoardRouter'));

const LogoutRouterFile=require(path.join(__dirname,'.','Router','LogoutRouter'));

const ForgetRouterFile=require(path.join(__dirname,'.','Router','ForgotPasswordRouter'));

const AdminRouter=require(path.join(__dirname,'.','Router','AdminRouter'));

expressApi.use(bodyParser.urlencoded({
    extended:true
}));
expressApi.use(express.json());
expressApi.use(express.static(path.join(__dirname,'..','Client','public')));





expressApi.use('/Login',LoginRouterFile.LoginRouter);
expressApi.use('/Home',HomeRouterFile.HomeRouter);

expressApi.use('/Register',RegisterRouterFile.RegisterRouter);

expressApi.use('/Userdashboard',UserDashBoardRouterFile.userRouter);

expressApi.use('/Logout',LogoutRouterFile.logOutRouter);

expressApi.use('/Forgot',ForgetRouterFile.forgetPasswordRouter);

expressApi.use('/Admin',AdminRouter.adminRouter);



module.exports={
    expressApi,
}
