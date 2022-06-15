const menuDrop = () => {
  const menu = document.getElementById("menu");
  const xmark = document.getElementById("xmark");
  const bars = document.getElementById("bars");
  
  menu.style.display = "flex";
  xmark.style.display = "block";
  bars.style.display = "none";
};

const menuClose = () => {
  const menu = document.getElementById("menu");
  const bars = document.getElementById("bars");
  const xmark = document.getElementById("xmark");
  
  menu.style.display = "none";
  xmark.style.display = "none"
  bars.style.display = "block";
}
 