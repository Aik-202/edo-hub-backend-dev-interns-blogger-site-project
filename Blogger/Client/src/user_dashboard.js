// comments = document.querySelectorAll(".comment")
// console.log(comments.length)
//userdashboard navigation
const nav = document.querySelectorAll(".nav");
const content = document.querySelectorAll(".content");
const collapse = document.getElementById("collapse");
const show = document.getElementById("show");
for (let i = 0; i < nav.length; i++) {
    nav[i].addEventListener("click", () => {
        if (i == 0) {
            nav[i].classList.add("editp-active");
            content[i].classList.add("content-active");
        } else {
            nav[i].classList.add("nav-active");
            content[i].classList.add("content-active");
        }
        for (let j = 0; j < nav.length; j++) {
            if (nav[j] !== nav[i]) {
                if (i == 0) {
                    nav[j].classList.remove("editp-active");
                    content[j].classList.remove("content-active");
                } else {
                    nav[j].classList.remove("nav-active");
                    content[j].classList.remove("content-active");
                }
            }
        }
    });
}

const heading = document.getElementsByClassName('headings');
const followersPost = document.getElementById('followers_post');
const recommendedPost = document.getElementById('recommended_post');
for (let i = 0; i < heading.length; i++) {
    heading[i].addEventListener("click", () => {
        if (i === 0) {
            heading[1].classList.remove("heading-active");
            heading[1].classList.add("heading-unactive");
            heading[i].classList.add("heading-active");
            followersPost.style.display = "block";
            recommendedPost.style.display = "none";
        }
        if (i === 1) {
            heading[0].classList.remove("heading-active");
            heading[0].classList.add("heading-unactive");
            heading[i].classList.remove("heading-unactive")
            heading[i].classList.add("heading-active");
            followersPost.style.display = "none";
            recommendedPost.style.display = "block";
        }
    });
}

const storyHeading = document.getElementsByClassName('story_headings');
const storiesPost = document.getElementById('stories');
const bookmarkPost = document.getElementById('Bookmarks');
for (let i = 0; i < storyHeading.length; i++) {
    storyHeading[i].addEventListener("click", () => {
        if (i === 0) {
            storyHeading[1].classList.remove("story_heading-active");
            storyHeading[1].classList.add("story_heading-unactive");
            storyHeading[i].classList.add("story_heading-active");
            storiesPost.style.display = "block";
            bookmarkPost.style.display = "none";
        }
        if (i === 1) {
            storyHeading[0].classList.remove("story_heading-active");
            storyHeading[0].classList.add("story_heading-unactive");
            storyHeading[i].classList.remove("story_heading-unactive")
            storyHeading[i].classList.add("story_heading-active");
            storiesPost.style.display = "none";
            bookmarkPost.style.display = "block";
        }
    });
}

//collapse dashboard
collapse.addEventListener("click", () => {
    const sideBar = document.getElementById("side_bar1").classList.add("collapse");
    const logoText = document.getElementById("logo_text");
    logoText.style.display = "none"
    collapse.style.display = "none"
    logoText.previousElementSibling.style.width = "45px";
    logoText.previousElementSibling.style.height = "40px";
    logoText.previousElementSibling.style.marginLeft = "5px"
    show.style.display = "block";
    show.style.marginLeft = "-165px";
    for (let i = 0; i < content.length; i++) {
        content[i].style.marginLeft = "10%"
    }
});

//show full dashboard
show.addEventListener("click", () => {
    const sideBar = document.getElementById("side_bar1").classList.remove("collapse");
    const logoText = document.getElementById("logo_text");
    collapse.style.display = "block"
    logoText.style.display = "block"
    logoText.previousElementSibling.style.width = "40px";
    logoText.previousElementSibling.style.height = "35px";
    logoText.previousElementSibling.style.marginLeft = "0"
    show.style.display = "none"
    for (let i = 0; i < content.length; i++) {
        content[i].style.marginLeft = "23%"
    }
});

//variables for uploading image 
const uploadImage = document.getElementById("upload_image");
const edit = document.querySelectorAll("#edit");
const camera = document.getElementById("camera");
const imageOptions = document.getElementById("image_options");

//showing options for uploading image 
camera.addEventListener("click", () => {
    uploadImage.style.display = "block";
    camera.style.display = "none";
    camera.previousElementSibling.style.display = "none";
});


//upload image with FileReader
uploadImage.addEventListener("change", () => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const imageUrl = reader.result;
        uploadImage.previousElementSibling.style.backgroundImage = `url(${imageUrl})`;
        for (i = 0; i < edit.length; i++) {
            edit[i].setAttribute("src", imageUrl);
        }
    });
    reader.readAsDataURL(uploadImage.files[0]);
    uploadImage.style.display = "none";
    imageOptions.style.display = "block";
});

//choosing another image or uploading image to account
const Options = document.querySelectorAll(".options");
for (let i = 0; i < Options.length; i++) {
    Options[i].addEventListener("click", () => {
        if (i == 0) {
            uploadImage.style.display = "block";
            imageOptions.style.display = "none";
        } else if (i == 1) {
            Options[i].classList.toggle = "success"
            //insert function that uploads image to cloudinary and stores it in user account on our database
            uploadImage.style.display = "none";
            imageOptions.style.display = "none";
            camera.style.display = "block";

        }
    });
}

// var numberOfLikes = []

const addComment = document.querySelectorAll(".add_comment");
const sendComment = document.querySelectorAll(".send_comment");
const actualComment = document.querySelectorAll(".comment")
const comments = document.querySelectorAll(".fa-comment")
const regular = document.querySelectorAll(".fa-regular");
const thumbs = document.querySelectorAll("#thumbs");
const markBook = document.getElementById("markbook");
const likes = document.querySelectorAll("#like");
for (let i = 0; i < regular.length; i++) {
    regular[i].addEventListener("click", () => {
        regular[i].classList.toggle("fa-solid");
        for (let j = 0; j < thumbs.length; j++) {
            if (regular[i] == thumbs[j]) {
                let like = Number(regular[i].firstElementChild.innerHTML);
                like++;
                regular[i].firstElementChild.innerHTML = like;
                likes[j].firstElementChild.innerHTML = "Unlike";
                regular[i].addEventListener("click", () => {
                    like--;
                    regular[i].firstElementChild.innerHTML = like;
                    likes[j].firstElementChild.innerHTML = "Like";
                })
            }
            if (regular[i] == markBook) {
                const followersPost = document.getElementById('followers_post_card');
                const bookmark = document.getElementById("Bookmarks");
                const clonedNode = followersPost.cloneNode(true);
                return bookmark.appendChild(clonedNode);
            }
            if (regular[i] == comments[j]){
                addComment[j].classList.toggle("add_comment-active");
                sendComment[j].addEventListener("click", () => {
                    addComment[j].appendChild(actualComment[j].cloneNode(true));
                });
            }
        }
    });
}
     
//local storage
//  var uploadedImage
//  if (Options[i].classList.toggle = "success") {
//      uploadedImage = "upload success";
//  } else {
//      uploadedImage = "upload failure";
//  }
//  localStorage.setItem("uploadStatus", JSON.stringify(uploadedImage));
// const getUploadStatus = JSON.parse(localStorage.getItem("uploadStatus"));
// if(getUploadStatus === "upload success"){
//     uploadImage.previousElementSibling.style.backgroundImage = `url(${imageUrl})`;
// }
