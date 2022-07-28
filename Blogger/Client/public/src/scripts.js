//hamburger menu variables 
let menu = document.getElementById("menu");
let xmark = document.getElementById("xmark");
let bars = document.getElementById("bars");

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

// variables for accordion
let content1 = document.getElementById("content1");
let content2 = document.getElementById("content2");
let content3 = document.getElementById("content3");
let content4 = document.getElementById("content4");
let container1 = document.getElementById("container1");
let container2 = document.getElementById("container2");
let container3 = document.getElementById("container3");
let container4 = document.getElementById("container4");


//accordion
const accordionDrop = (id) => {
  if (id == plus1) {
    displayContent(container1, content1, id, id.nextElementSibling)
  } else if (id == plus2) {
    displayContent(container2, content2, id, id.nextElementSibling)
  } else if (id == plus3) {
    displayContent(container3, content3, id, id.nextElementSibling)
  } else if (id == plus4) {
    displayContent(container4, content4, id, id.nextElementSibling)
  }
}

const displayContent = (container, content, plus, xmark) => {
  content.style.display = "block";
  plus.style.display = "none";
  xmark.style.display = "block";
  container.classList.remove("close");
  container.classList.add("open");
}

const accordionClose = (id) => {
  if (id == xmark1) {
    hideContent(container1, content1, id.previousElementSibling, id)
  } else if (id == xmark2) {
    hideContent(container2, content2, id.previousElementSibling, id)
  } else if (id == xmark3) {
    hideContent(container3, content3, id.previousElementSibling, id)
  } else if (id == xmark4) {
    hideContent(container4, content4, id.previousElementSibling, id)
  }
}

const hideContent = (container, content, plus, xmark) => {
  content.style.display = "none";
  plus.style.display = "block";
  xmark.style.display = "none";
  container.classList.remove("open");
  container.classList.add("close");
}

// variable for dark mode
let element = document.body;

//darkmode
const darkMode = () => {
  element.classList.toggle("dark_theme");
  //set theme
  var theme
  if (element.classList == "dark_theme") {
    theme = "DARK"
  } else {
    theme = "LIGHT"
  }
  localStorage.setItem("pageTheme", JSON.stringify(theme));
}

let getTheme = JSON.parse(localStorage.getItem("pageTheme"));

if (getTheme === "DARK") {
  element.classList.toggle("dark_theme");
}


//increase font mode
const increaseFontMode = () => {
  element.classList.toggle("increase_font");
  //set theme
  var font
  if (element.classList == "increase_font") {
    font = "BIG"
  } else {
    font = "NORMAL"
  }
  localStorage.setItem("pageFont", JSON.stringify(font));
}

let getFont = JSON.parse(localStorage.getItem("pageFont"));

if (getFont === "BIG") {
  element.classList.toggle("increase_font");
}
