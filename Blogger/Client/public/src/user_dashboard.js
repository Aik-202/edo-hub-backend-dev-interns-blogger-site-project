//userdashboard navigation
const nav = document.querySelectorAll(".nav");
const content = document.querySelectorAll(".content");
const userImage = document.getElementById("user_image");
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
    // link to profile by clicking on user image
    userImage.addEventListener("click", () => {
        if (i == 0) {
            if (window.innerWidth <= 400) {
                nav[i].classList.add("editp-active");
                content[i].classList.add("content-active");
                content[4].classList.add("content-active");
            } else {
                nav[i].classList.add("editp-active");
                content[i].classList.add("content-active");
            }
        } else if (i !== 0 && i !== 4) {
            nav[i].classList.remove("nav-active");
            content[i].classList.remove("content-active");
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
        content[i].classList.add("collapse_content");
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
        content[i].classList.remove("collapse_content");
    }
});

//userdashboard edit profile; changing username
const userName = document.getElementById("user_name");
const user = document.getElementById("name");
const about = document.getElementById("about");
user.placeholder = userName.innerHTML;
about.placeholder = "No about yet";

user.nextElementSibling.addEventListener("click", () => {
    user.id = "edit_info-active";
    user.value = user.placeholder;
    user.placeholder = "";
    user.select();
    user.nextElementSibling.style.display = "none";
    user.nextElementSibling.nextElementSibling.style.display = "block";
});

about.nextElementSibling.addEventListener("click", () => {
    about.id = ("edit_info-active");
    about.value = about.placeholder;
    about.placeholder = "";
    about.select();
    about.nextElementSibling.style.display = "none";
    about.nextElementSibling.nextElementSibling.style.display = "block";
});

user.nextElementSibling.nextElementSibling.addEventListener("click", () => {
    user.id = "name";
    user.placeholder = user.value;
    user.nextElementSibling.style.display = "block";
    user.nextElementSibling.nextElementSibling.style.display = "none";
});

about.nextElementSibling.nextElementSibling.addEventListener("click", () => {
    about.id = "about";
    about.placeholder = about.value;
    about.nextElementSibling.style.display = "block";
    about.nextElementSibling.nextElementSibling.style.display = "none";
});


//Uploading image 
const uploadImage = document.getElementById("upload_image");
const edit = document.querySelectorAll(".edit");
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

//userdashboard home section, following and recommended headings
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

//userdashboard story section, stories and bookmark headings
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

//userdashboard publish section, publish posts and scheduled posts headings
const publishHeading = document.getElementsByClassName('publish_headings');
const publishPost = document.getElementById('publish_post');
const scheduledPost = document.getElementById('scheduled_post');
for (let i = 0; i < publishHeading.length; i++) {
    publishHeading[i].addEventListener("click", () => {
        if (i === 0) {
            publishHeading[1].classList.remove("publish_heading-active");
            publishHeading[1].classList.add("publish_heading-unactive");
            publishHeading[i].classList.add("publish_heading-active");
            publishPost.style.display = "block";
            scheduledPost.style.display = "none";
        }
        if (i === 1) {
            publishHeading[0].classList.remove("publish_heading-active");
            publishHeading[0].classList.add("publish_heading-unactive");
            publishHeading[i].classList.remove("publish_heading-unactive")
            publishHeading[i].classList.add("publish_heading-active");
            publishPost.style.display = "none";
            scheduledPost.style.display = "block";
        }
    });
}

//userdashboard user's engagements on post; likes, comments, bookmark
const addComment = document.querySelectorAll(".add_comment");
const sendComment = document.querySelectorAll(".send_comment");
const actualComment = document.querySelectorAll(".comment")
const comments = document.querySelectorAll(".fa-comment")
const regular = document.querySelectorAll(".fa-regular");
const commentInput = document.querySelectorAll(".comment_input");
const thumbs = document.querySelectorAll("#thumbs");
const markBook = document.getElementById("markbook");
const likes = document.querySelectorAll("#like");
for (let i = 0; i < regular.length; i++) {
    regular[i].addEventListener("click", () => {
        regular[i].classList.toggle("fa-solid");
        for (let j = 0; j < thumbs.length; j++) {

            //code for likes
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

            //code for bookmark
            if (regular[i] == markBook) {
                const followersPost = document.getElementById('followers_post_card');
                const bookmark = document.getElementById("Bookmarks");
                const clonedNode = followersPost.cloneNode(true);
                return bookmark.appendChild(clonedNode);
            }

            //code for comments
            if (regular[i] == comments[j]) {

                //adding comments
                addComment[j].classList.toggle("add_comment-active");
                for (let k = 0; k < addComment.length; k++) {
                    if (addComment[k] !== addComment[j] && addComment[k].classList.contains("add_comment-active")) {
                        addComment[k].classList.remove("add_comment-active");
                        comments[k].classList.remove("fa-solid");
                    }
                }

                //sending comments
                sendComment[j].addEventListener("click", () => {
                    const date = new Date();
                    const enUsDateFormatter = new Intl.DateTimeFormat('en-Us');
                    if (commentInput[j].firstElementChild.value) {
                        userComment = actualComment[j].cloneNode(true)
                        userComment.classList.add("cloned")
                        userComment.lastElementChild.lastElementChild.classList.add("delete_cloned");
                        addComment[j].appendChild(userComment);
                        userComment.firstElementChild.firstElementChild.src = userImage.src;
                        userComment.firstElementChild.firstElementChild.nextElementSibling.innerHTML = userName.innerHTML;
                        userComment.firstElementChild.nextElementSibling.innerHTML = commentInput[j].firstElementChild.value;
                        userComment.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.innerHTML = enUsDateFormatter.format(date);
                        commentInput[j].firstElementChild.value = "";
                        let deleteComment = document.querySelectorAll(".delete_cloned");
                        let cloned = document.querySelectorAll(".cloned");

                        //deleting comments
                        for (let k = 0; k < deleteComment.length; k++) {
                            deleteComment[k].addEventListener("click", () => {
                                cloned[k].remove();
                            });
                        }

                    } else { //a little animation for when the inpt field is empty
                        var pos = 20;
                        const move = () => {
                            pos = pos + 5
                            commentInput[j].style.bottom = pos + "px";
                            commentInput[j].style.bottom = pos + "px";
                            if (pos >= 30) {
                                clearInterval(timer);
                                if (window.innerWidth <= 400) {
                                    commentInput[j].style.bottom = "10%";
                                } else {
                                    commentInput[j].style.bottom = "10px";
                                }
                            }
                        }
                        var timer = setInterval(move, 500);
                    }
                });
            }
        }
    });
}

//code for adding replies
const addReply = document.querySelectorAll(".add_reply");
const commentReaction = document.querySelectorAll(".comment_reaction");
const replies = document.querySelectorAll(".replies");
const replyInput = document.querySelectorAll(".reply_input")
for (let i = 0; i < replies.length; i++) {
    replies[i].addEventListener("click", () => {
        addReply[i].classList.toggle("add_reply-active");
        commentInput[i].style.display = "none";
        replyInput[i].style.display = "flex";
        replies[i].nextElementSibling.nextElementSibling.innerHTML = "Exit reply";
    });
    replies[i].nextElementSibling.nextElementSibling.addEventListener("click", () => {
        commentInput[i].style.display = "none";
        replyInput[i].style.display = "flex";
        replies[i].nextElementSibling.nextElementSibling.innerHTML = "Exit reply"
        addReply[i].classList.toggle("add_reply-active");
        commentInput[i].style.display = "none";
        replyInput[i].style.display = "flex";
        if (!addReply[i].classList.contains("add_reply-active")) {
            replies[i].nextElementSibling.nextElementSibling.innerHTML = "Reply"
            commentInput[i].style.display = "flex";
        }
    });
}

//userdashboard drop down dates for account summary section
const months = document.querySelectorAll(".month");
const up = document.getElementById("angle-up");
const down = document.getElementById("angle-down");
const chartsDate = document.getElementById("charts-display-options");
const monthChosen = document.getElementById("month_chosen");
const monthYear = document.getElementById("year")
down.addEventListener("click", () => {
    up.style.display = "block";
    down.style.display = "none";
    chartsDate.style.display = "flex";
});

up.addEventListener("click", () => {
    up.style.display = "none";
    down.style.display = "block";
    chartsDate.style.display = "none";
});

for (let i = 0; i < months.length; i++) {
    months[i].addEventListener("click", () => {
        monthChosen.innerHTML = months[i].innerHTML;
        months[i].style.display = "none";
        monthYear.style.display = "flex";
        for (let j = 0; j < months.length; j++) {
            months[j].addEventListener("click", () => {
                if (i != j) {
                    months[i].style.display = "flex";
                    months[j].style.display = "none";
                }
            });
        }
    });
};

monthYear.addEventListener("click", () => {
    monthYear.style.display = "none";
    for (let i = 0; i < months.length; i++) {
        months[i].style.display = "flex";
        monthYear.style.display = "none";
        monthChosen.innerHTML = monthYear.innerHTML;
    }
});

//userdashboard charts for account summary section
let personalChart = document.getElementById("personal_chart").getContext('2d');
let engageChart = document.getElementById("engage_chart").getContext('2d');
let generalChart = document.getElementById("general_chart").getContext('2d');
let storiesChart = document.getElementById("stories_chart").getContext('2d');
let draftsChart = document.getElementById("drafts_chart").getContext('2d');
let bookmarksChart = document.getElementById("bookmarks_chart").getContext('2d');
let viewsChart = document.getElementById("views_chart").getContext('2d');
let likesChart = document.getElementById("likes_chart").getContext('2d');
let commentsChart = document.getElementById("comments_chart").getContext('2d');

let jan = ['Jan 1st - Jan 7th', 'Jan 8th - Jan 14th', 'Jan 15th - Jan 21st', 'Jan 22nd - Jan 28th', 'Jan 29th - Jan 31st'];
let feb = ['Feb 1st - Feb 7th', 'Feb 8th - Feb 14th', 'Feb 15th - Feb 21st', 'Feb 22nd - Feb 28th'];
let mar = ['Mar 1st - Mar 7th', 'Mar 8th - Mar 14th', 'Mar 15th - Mar 21st', 'Mar 22nd - Mar 28th', 'Mar 29th - Mar 31st'];
let apr = ['Apr 1st - Apr 7th', 'Apr 8th - Apr 14th', 'Apr 15th - Apr 21st', 'Apr 22nd - Apr 28th', 'Apr 29th - Apr 30th'];
let may = ['May 1st - May 7th', 'May 8th - May 14th', 'May 15th - May 21st', 'May 22nd - May 28th', 'May 29th - May 31st'];
let jun = ['Jun 1st - Jun 7th', 'Jun 8th - Jun 14th', 'Jun 15th - Jun 21st', 'Jun 22nd - Jun 28th', 'Jun 29th - Jun 30th'];
let jul = ['Jul 1st - Jul 7th', 'Jul 8th - Jul 14th', 'Jul 15th - Jul 21st', 'Jul 22nd - Jul 28th', 'Jul 29th - Jul 31st'];
let aug = ['Aug 1st - Aug 7th', 'Aug 8th - Aug 14th', 'Aug 15th - Aug 21st', 'Aug 22nd - Aug 28th', 'Aug 29th - Aug 31st'];
let sep = ['Sep 1st - Sep 7th', 'Sep 8th - Sep 14th', 'Sep 15th - Sep 21st', 'Sep 22nd - Sep 28th', 'Sep 29th - Sep 30th'];
let oct = ['Oct 1st - Oct 7th', 'Oct 8th - Oct 14th', 'Oct 15th - Oct 21st', 'Oct 22nd - Oct 28th', 'Oct 29th - Oct 31st'];
let nov = ['Nov 1st - Nov 7th', 'Nov 8th - Nov 14th', 'Nov 15th - Nov 21st', 'Nov 22nd - Nov 28th', 'Nov 29th - Nov 30th'];
let dec = ['Dec 1st - Dec 7th', 'Dec 8th - Dec 14th', 'Dec 15th - Dec 21st', 'Dec 22nd - Dec 28th', 'Dec 29th - Dec 31st'];

let x = ['Stories', 'Drafts', 'Bookmarks'];
let a = ['Views', 'Likes', 'Comments'];

let stb1 = [26, 6, 16];
let vlc1 = [16, 16, 15];
yearTotal = [...stb1, ...vlc1];
yearTotalLabel = [...x, ...a];

let storiesJan = [4, 3, 1, 2, 3];
let storiesFeb = [2, 4, 3, 5];
let storiesMar = [2, 1, 1, 2, 3];
let storiesApr = [6, 3, 3, 5, 2];
let storiesMay = [5, 7, 1, 2, 3];
let storiesJun = [3, 9, 3, 5, 1];
let storiesJul = [9, 3, 1, 2, 3];
let storiesAug = [7, 5, 3, 5, 0];
let storiesSep = [5, 2, 1, 2, 3];
let storiesOct = [9, 7, 4, 8, 6];
let storiesNov = [3, 4, 6, 5, 3];
let storiesDec = [6, 2, 1, 1, 0];


new Chart(personalChart, {
    type: 'bar',
    data: {
        labels: x,
        datasets: [{
            data: stb1,
            label: "Jan 2022 - Dec 2022",
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
            barPercentage: 0.2,
            categoryPercentage: 0.2
        }],
    },

    options: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Stories, Drafts, Bookmarks from Jan 2022 - Dec 2022'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
            }]
        }
    }
});

new Chart(engageChart, {
    type: 'bar',
    data: {
        labels: a,
        datasets: [{
            data: vlc1,
            label: "Jan 2022 - Dec 2022",
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
            barPercentage: 0.2,
            categoryPercentage: 0.2
        }]
    },
    options: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Views, Likes, Comments from Jan 2022 - Dec 2022'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
            }]
        }
    }
});

new Chart(generalChart, {
    type: 'doughnut',
    data: {
        labels: yearTotalLabel,
        datasets: [{
            data: yearTotal,
            label: "Jan 2022 - Dec 2022",
            backgroundColor: [
                'rgba(255, 89, 61, 0.4)',
                'rgba(11, 156, 49, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(213, 184, 255, 0.4)',
                'rgba(54, 162, 235, 0.4)'
            ],
            borderColor: [
                'rgba(255, 89, 61, 1)',
                'rgba(11, 156, 49, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(213, 184, 255, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }],
    },
    options: {
        legend: {
            display: true
        },
        title: {
            display: true,
            text: 'Stories, Drafts, Bookmarks, Views, Likes, Comments from Jan 2022 - Dec 2022'
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false
            }]
        },

    }
});

let stories = new Chart(storiesChart, {
    type: 'line',
    data: {
        labels: jan,
        datasets: [{
            data: storiesJan,
            label: "Stories",
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: 'origin',
            pointBorderRadius: 5,
            borderWidth: 1
        }],
    },
    options: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Stories for Jan 2022'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
            }]
        }
    }
});

stories.data.labels = feb;
stories.data.datasets[0].data = storiesFeb;
stories.options.title.text = 'Stories for Feb 2022';

//userdashboard scheduler for scheduling posts
const fixSchedule = document.getElementById("schedule");
schedule.addEventListener("click", () => {
    alert("Welcome, please set the date and time you wish to publish your post");
});

//custom function to replace the native alert box function
window.alert = function (alert_message) {
    customAlert(alert_message)
}

//the custom function  
function customAlert(alert_message) {
    let alertTitle = "BLOGGER SCHEDULER"; //title of alert box
    let alertButtonText1 = "SET DATE"; //text for the alert box button1
    let alertButtonText2 = "EXIT"; //text for the alert box button2
    let alertexist = document.getElementById("alert_container"); //checking if the alert_container id exists

    if (alertexist) {
        return;
    }

    //creating a div for the alert message and adding it to the body and setting it's class and id name 
    let body = document.querySelector("body");
    let divForAlertContainer = document.createElement("div");
    let alertContainer = body.appendChild(divForAlertContainer);
    alertContainer.id = "alert_container";
    alertContainer.className = "alert_container";

    //creating the actual alert box and appending it to the alert_container
    let divForAlertBox = document.createElement("div");
    let scheduler = alertContainer.appendChild(divForAlertBox);
    scheduler.className = "scheduler";

    //creating the title element h1 for the alert message
    let alertHeaderTag = document.createElement("h1");
    let schedulerTitle = scheduler.appendChild(alertHeaderTag);
    let alertTitleText = document.createTextNode(alertTitle);
    schedulerTitle.appendChild(alertTitleText);

    //creating the actual alert message   
    let alertWelcomeElement = document.createElement("p");
    let alertWelcome = scheduler.appendChild(alertWelcomeElement);
    alertWelcome.textContent = alert_message;

    //creating the input and label fields to enable users set date and time to schedule posts  
    let labelElement1 = document.createElement("label");
    let inputFieldElement1 = document.createElement("input");
    let labelElement2 = document.createElement("label");
    let inputFieldElement2 = document.createElement("input");

    scheduler.appendChild(labelElement1);
    scheduler.appendChild(inputFieldElement1);
    scheduler.appendChild(labelElement2);
    scheduler.appendChild(inputFieldElement2);

    labelElement1.textContent = "Set Publishing Date";
    labelElement2.textContent = "Set Publishing Time";
    inputFieldElement1.type = "date";
    inputFieldElement2.type = "time";

    //creating the buttons for the alert message  
    let buttonElementContainer = document.createElement("div")
    let buttonElement1 = document.createElement("button");
    let buttonElement2 = document.createElement("button");

    buttonElementContainer.className = "button_container";
    buttonElement1.id = "set_date";
    buttonElement2.id = "exit";

    scheduler.appendChild(buttonElementContainer);
    buttonElementContainer.appendChild(buttonElement1);
    buttonElementContainer.appendChild(buttonElement2);

    buttonElementText1 = document.createTextNode(alertButtonText1);
    buttonElementText2 = document.createTextNode(alertButtonText2);

    buttonElement1.appendChild(buttonElementText1);
    buttonElement2.appendChild(buttonElementText2);

    buttonElement2.addEventListener("click", () => {
        body.removeChild(alertContainer);
    })
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
