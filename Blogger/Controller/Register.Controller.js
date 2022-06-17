const path=require('path');

function RegisterRouterGetFunction(req,res){
    res.sendFile(path.join(__dirname, '..', 'Client', 'public', 'Register_page.html',));
}

function RegisterRouterPostFunction (req,res){
    //res.render('Register_page')
    }

    module.exports={
        RegisterRouterGetFunction,
        RegisterRouterPostFunction,
    }
