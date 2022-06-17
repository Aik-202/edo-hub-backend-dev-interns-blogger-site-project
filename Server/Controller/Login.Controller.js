const path=require('path');

function LoginRouterGetFunction(req,res){
    res.sendFile(path.join(__dirname, '..', 'Client', 'public', 'Login_page.html',));
}
function LoginRouterPostFunction(req,res){


}
module.exports={
    LoginRouterGetFunction,
    LoginRouterPostFunction,
}
