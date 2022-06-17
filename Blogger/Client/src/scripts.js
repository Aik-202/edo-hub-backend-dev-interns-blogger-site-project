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
  if(id == home_link){
    id.style.color = "red"
    home.style.display = "flex";
    stories.style.display = "none";
    stats.style.display = "none";
    followers.style.display = "none";
    publish.style.display = "none";
  } else if(id == stories_link){
    home.style.display = "none";
    stories.style.display = "flex";
    stats.style.display = "none";
    followers.style.display = "none";
    publish.style.display = "none";
  } else if(id == stats_link){
    home.style.display = "none";
    stories.style.display = "none";
    stats.style.display = "flex";
    followers.style.display = "none";
    publish.style.display = "none";
  } else if(id == followers_link){
    home.style.display = "none";
    stories.style.display = "none";
    stats.style.display = "none";
    followers.style.display = "flex";
    publish.style.display = "none";
  } else if(id == publish_link){
    home.style.display = "none";
    stories.style.display = "none";
    stats.style.display = "none";
    followers.style.display = "none";
    publish.style.display = "flex";
  }
}