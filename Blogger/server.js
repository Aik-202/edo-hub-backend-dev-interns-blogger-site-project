require('dotenv').config();
const path=require('path');

const {connectedDB,mongodbLink}=require(path.join(__dirname,'.','Database','db'));

const express=require('express');

const app=express();

const session=require('express-session');
const cookieParser = require('cookie-parser');

const connectMongodbSession=require('connect-mongodb-session')(session);

const store=new connectMongodbSession({
    uri:mongodbLink,
    collection:'sessionstores'
})


app.use(session({
    name:'session',
    resave:false,
    saveUninitialized:false,
    secret:process.env.SECRET,
    store,
    cookie:{
        maxAge:1000*60*60*24*3,
        sameSite:true,
    }
}));

app.use(express.static(path.join(__dirname,'Client','public')));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const {registration}=require(path.join(__dirname,'Router','registration.route'));

const {loginRoute}=require(path.join(__dirname,'Router','login.route'));

const {commentRouter}=require(path.join(__dirname,'Router','comment.route'));

const { userDashboardRoute}=require(path.join(__dirname,'Router','userDashboard.route'));

const {adminDashboardRoute}=require(path.join(__dirname,'Router','adminDashboard.route'));

const { schedule, unSuspendUser}=require(path.join(__dirname,'Controller','Schedule.controller'));

const { adminRoute}=require(path.join(__dirname,'Router','admin_functionalities.route'));

const { postRouter}=require(path.join(__dirname,'Router','post.route'));

const { userRouter}=require(path.join(__dirname,'Router','users.route'));

const {logoutRoute}=require(path.join(__dirname,'Router','logout.route'));

   setInterval(()=>{
    schedule()
    .then(()=>{
        unSuspendUser()
    })
   },9000);

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'Client','views'));

app.use('/register',registration);

app.use('/comments',commentRouter);

app.use('/login',loginRoute);

app.use('/userdashboard',userDashboardRoute);

app.use('/posts', postRouter);

app.use('/admindashboard',adminDashboardRoute);

app.use('/users', userRouter);

app.use('/admin',adminRoute);

app.use('/logout',logoutRoute);







const PORT=process.env.PORT||8000;

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})
