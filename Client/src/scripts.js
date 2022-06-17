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

//const darkMode = () => {
 // document.getElementById("light_mode").setAttribute("href", "/styles/darktheme.css")
 // console.log('Theme Changed!!')
//}

//for user dashboard
const pageSwitch = (id) => {
  const home = document.getElementById('Home');
  const stories = document.getElementById('stories');
  const stats = document.getElementById('stats');
  const followers = document.getElementById('followers');
  const publish = document.getElementById('publish');
  if(id == stories_link){
    id.style.color = "blue";
  } else if(id == stats_link){
    id.style.color = "green";
  } else if(id == followers_link){
    id.style.color = "purple";
  } else if(id == publish_link){
    id.style.color = "red";
  }
}