//hamburger menu variables 
let menu = document.getElementById("menu");
let xmark = document.getElementById("xmark");
let bars = document.getElementById("bars");
  
// variables for dark mode
let element = document.body;
let header = document.getElementsByClassName("header");
let headerList = document.getElementsByClassName("header_link");
let button = document.getElementsByTagName("button");
let main = document.getElementsByClassName("main_content");
let section = document.getElementsByClassName("inside_sub_contents_container");
let footer = document.getElementsByClassName("footer");
let faq = document.getElementsByClassName("questions_answers");
let faqQuestions = document.getElementsByClassName("questions_answers_container");
let mode = document.getElementById("mode")

let content1 = document.getElementById("content1");
let content2 = document.getElementById("content2");
let content3 = document.getElementById("content3");
let content4 = document.getElementById("content4");
let container1 = document.getElementById("container1");
let container2 = document.getElementById("container2");
let container3 = document.getElementById("container3");
let container4 = document.getElementById("container4");

// function for hamburger menu open
const menuDrop = () => {
  menu.style.display = "flex";
  xmark.style.display = "block";
  bars.style.display = "none";
};

// function for hamburger menu close
const menuClose = () => {
  menu.style.display = "none";
  xmark.style.display = "none"
  bars.style.display = "block";
}

//accordion
const accordionDrop = (id) => {
  if(id == plus1) {
    displayContent(container1,content1,id, id.nextElementSibling)
  }else if(id == plus2) {
    displayContent(container2,content2,id, id.nextElementSibling)
  }else if(id == plus3) {
    displayContent(container3,content3,id, id.nextElementSibling)
  }else if(id == plus4) {
    displayContent(container4,content4,id, id.nextElementSibling)
  }
}

const displayContent = (container,content, plus, xmark) => {
  content.style.display = "block";
  plus.style.display = "none";
  xmark.style.display = "block";
  container.classList.remove("close");
  container.classList.add("open");
}

const accordionClose = (id) => {
  if(id == xmark1) {
    hideContent(container1,content1,id.previousElementSibling,id)
  }else if(id == xmark2) {
    hideContent(container2,content2,id.previousElementSibling,id)
  }else if(id == xmark3) {
    hideContent(container3,content3,id.previousElementSibling,id)
  }else if(id == xmark4) {
    hideContent(container4,content4,id.previousElementSibling,id)
  }
}

const hideContent = (container,content, plus, xmark) => {
  content.style.display = "none";
  plus.style.display = "block";
  xmark.style.display = "none";
  container.classList.remove("open");
  container.classList.add("close");  
}

//darkmode
const darkMode = (id) => {
  element.classList.toggle("dark_theme");
  
  for(i = 0; i < header.length; i++){
    header[i].classList.toggle("dark_theme_header");
  }
  for(i = 0; i < headerList.length; i++){
    headerList[i].classList.toggle("dark_theme_headers_list");
  }
  for(i = 0; i < button.length; i++){
    button[i].classList.toggle("dark_theme_button");
  }
  for(i = 0; i < main.length; i++){
    main[i].classList.toggle("dark_theme_container");
  }
  for(i = 0; i < section.length; i++){
    section[i].classList.toggle("dark_theme_container");
  }
  for(i = 0; i < faq.length; i++){
    faq[i].classList.toggle("dark_theme_container");
  }
  for(i = 0; i < faqQuestions.length; i++){
    faqQuestions[i].classList.toggle("dark_theme_faq");
  }
  for(i = 0; i < footer.length; i++){
    footer[i].classList.toggle("dark_theme");
  } 
}


//userdashboard
const nav = document.querySelectorAll(".nav");
const content = document.querySelectorAll(".content");
const collapse = document.getElementById("collapse");
console.log(content)
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
    for( let i = 0; i < content.length; i++){
      content[i].style.marginLeft = "10%"
    }
  });

 
