const path=require('path');

function HomeGetController(req,res){
    res.sendFile(path.join(__dirname, '..', 'Client', 'public', 'index.html',));
}
module.exports={
    HomeGetController,
}