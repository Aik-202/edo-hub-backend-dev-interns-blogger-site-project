const socket=io('/Admin');


const seconds=1000;

const users=document.getElementById('number_of_online_users');

socket.on('online',(data)=>{
   users.innerHTML=data
    //I will write the code for content reload just here
});

const tabs = document.querySelectorAll(".tab-link");
const pages = document.querySelectorAll(".page");
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", () => {
    tabs[i].classList.add("tab-active");
    pages[i].classList.remove("hidden");
    for (let j = 0; j < tabs.length; j++) {
      if (tabs[j] !== tabs[i]) {
        tabs[j].classList.remove("tab-active");
        pages[j].classList.add("hidden");
      }
    }
  });
}
console.log(pages);
