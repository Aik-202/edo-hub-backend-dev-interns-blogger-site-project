let count=0;

function socketOperations(io){
    const Admin=io.of('/Admin');
    const UserDashBoard=io.of('/Userdashboard');
    UserDashBoard.on('connection',function(socket){
        count++;
        console.log(socket.id);
        console.log(count);
       Admin.on('connection',function(sockets){
        sockets.emit('online',count);
        UserDashBoard.on('disconnect',function(sock){
            count--;
            Admin.on('connection',function(socke){
                socke.emit('online',count);

            })   
        })


       })
})

    }

    module.exports={
    socketOperations,
}