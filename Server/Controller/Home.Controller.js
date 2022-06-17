const path=require('path');

function HomeGetController(req,res){
    res.sendFile(path.join(__dirname, '..', 'Client', 'public', 'Home.html',));
}
module.exports={
    HomeGetController,
}