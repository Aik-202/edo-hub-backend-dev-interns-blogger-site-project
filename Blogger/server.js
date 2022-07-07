const path=require('path');

const apiExpress=require(path.join(__dirname,'.','./app.express'));

const server=require('http').createServer(apiExpress.expressApi);

const {Server}=require('socket.io')
const io=new Server(server);



const sockets=require(path.join(__dirname,'.','socket'));



sockets.socketOperations(io);




server.listen('5000',()=>{
    console.log('server running');
});













