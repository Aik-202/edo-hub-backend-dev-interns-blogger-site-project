//userdashboard
const nav = document.querySelectorAll(".nav");
const content = document.querySelectorAll(".content");
const collapse = document.getElementById("collapse");
const show = document.getElementById("show");
for( let i = 0; i < nav.length; i++){
  nav[i].addEventListener("click", () => {
  if(i == 0){
    nav[i].classList.add("editp-active");
    content[i].classList.add("content-active");
  }else {
    nav[i].classList.add("nav-active");
    content[i].classList.add("content-active");
  }
  for( let j = 0; j < nav.length; j++){
    if(nav[j] !== nav[i]){
      if(i == 0){
        nav[j].classList.remove("editp-active");
        content[j].classList.remove("content-active");
      }else {
        nav[j].classList.remove("nav-active");
        content[j].classList.remove("content-active");
      }
    }
  }
  });
}
  collapse.addEventListener("click", () => {
    const sideBar = document.getElementById("side_bar1").classList.add("collapse");
    collapse.style.display = "none"
    show.style.display = "block"
    for( let i = 0; i < content.length; i++){
      content[i].style.marginLeft = "10%"
    }
  });

  show.addEventListener("click", () => {
    const sideBar = document.getElementById("side_bar1").classList.remove("collapse");
    collapse.style.display = "block"
    show.style.display = "none"
    for( let i = 0; i < content.length; i++){
      content[i].style.marginLeft = "23%"
    }
  });