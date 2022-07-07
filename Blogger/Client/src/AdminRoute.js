const socket=io('/Admin');


const seconds=1000;

const users=document.getElementById('number_of_online_users');

const userValue=users.innerHTML;

socket.on('online',(data)=>{
    console.log(`this is:${data}`);
   users.innerHTML=data
    //I will write the code for content reload just here
});
