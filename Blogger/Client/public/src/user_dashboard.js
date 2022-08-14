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

let x = ['Stories', 'Drafts', 'Bookmarks'];
let a = ['Views', 'Likes', 'Comments'];


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

let draftsJan = [4, 3, 1, 2, 3];
let draftsFeb = [2, 4, 3, 5];
let draftsMar = [2, 1, 1, 2, 3];
let draftsApr = [6, 3, 3, 5, 2];
let draftsMay = [5, 7, 1, 2, 3];
let draftsJun = [3, 9, 3, 5, 1];
let draftsJul = [9, 3, 1, 2, 3];
let draftsAug = [7, 5, 3, 5, 0];
let draftsSep = [5, 2, 1, 2, 3];
let draftsOct = [9, 7, 4, 8, 6];
let draftsNov = [3, 4, 6, 5, 3];
let draftsDec = [6, 2, 1, 1, 0];

let bookmarksJan = [4, 3, 1, 2, 3];
let bookmarksFeb = [2, 4, 3, 5];
let bookmarksMar = [2, 1, 1, 2, 3];
let bookmarksApr = [6, 3, 3, 5, 2];
let bookmarksMay = [5, 7, 1, 2, 3];
let bookmarksJun = [3, 9, 3, 5, 1];
let bookmarksJul = [9, 3, 1, 2, 3];
let bookmarksAug = [7, 5, 3, 5, 0];
let bookmarksSep = [5, 2, 1, 2, 3];
let bookmarksOct = [9, 7, 4, 8, 6];
let bookmarksNov = [3, 4, 6, 5, 3];
let bookmarksDec = [6, 2, 1, 1, 0];

let viewsJan = [4, 3, 1, 2, 3];
let viewsFeb = [2, 4, 3, 5];
let viewsMar = [2, 1, 1, 2, 3];
let viewsApr = [6, 3, 3, 5, 2];
let viewsMay = [5, 7, 1, 2, 3];
let viewsJun = [3, 9, 3, 5, 1];
let viewsJul = [9, 3, 1, 2, 3];
let viewsAug = [7, 5, 3, 5, 0];
let viewsSep = [5, 2, 1, 2, 3];
let viewsOct = [9, 7, 4, 8, 6];
let viewsNov = [3, 4, 6, 5, 3];
let viewsDec = [6, 2, 1, 1, 0];

let likesJan = [4, 3, 1, 2, 3];
let likesFeb = [2, 4, 3, 5];
let likesMar = [2, 1, 1, 2, 3];
let likesApr = [6, 3, 3, 5, 2];
let likesMay = [5, 7, 1, 2, 3];
let likesJun = [3, 9, 3, 5, 1];
let likesJul = [9, 3, 1, 2, 3];
let likesAug = [7, 5, 3, 5, 0];
let likesSep = [5, 2, 1, 2, 3];
let likesOct = [9, 7, 4, 8, 6];
let likesNov = [3, 4, 6, 5, 3];
let likesDec = [6, 2, 1, 1, 0];

let commentsJan = [4, 3, 1, 2, 3];
let commentsFeb = [2, 4, 3, 5];
let commentsMar = [2, 1, 1, 2, 3];
let commentsApr = [6, 3, 3, 5, 2];
let commentsMay = [5, 7, 1, 2, 3];
let commentsJun = [3, 9, 3, 5, 1];
let commentsJul = [9, 3, 1, 2, 3];
let commentsAug = [7, 5, 3, 5, 0];
let commentsSep = [5, 2, 1, 2, 3];
let commentsOct = [9, 7, 4, 8, 6];
let commentsNov = [3, 4, 6, 5, 3];
let commentsDec = [6, 2, 1, 1, 0];

//actual charts

//general chart
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

//general chart for stories, drafts and bookmarks
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

//general chart for views, likes, comments
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

//stories chart
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

//drafts chart
let drafts = new Chart(draftsChart, {
    type: 'line',
    data: {
        labels: jan,
        datasets: [{
            data: draftsJan,
            label: "Drafts",
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
            text: 'Drafts for Jan 2022'
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

//bookmarks chart
let bookmark = new Chart(bookmarksChart, {
    type: 'line',
    data: {
        labels: jan,
        datasets: [{
            data: bookmarksJan,
            label: "Bookmarks",
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
            text: 'Bookmarks for Jan 2022'
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

//views chart
let views = new Chart(viewsChart, {
    type: 'line',
    data: {
        labels: jan,
        datasets: [{
            data: viewsJan,
            label: "Views",
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
            text: 'Views for Jan 2022'
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

//likes chart
let like = new Chart(likesChart, {
    type: 'line',
    data: {
        labels: jan,
        datasets: [{
            data: likesJan,
            label: "Likes",
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
            text: 'Likes for January 2022'
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

//comment chart
let comment = new Chart(commentsChart, {
    type: 'line',
    data: {
        labels: jan,
        datasets: [{
            data: commentsJan,
            label: "Comments",
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
            text: 'Comments for Jan 2022'
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

//userdashboard drop down dates for account summary section
const months = document.querySelectorAll(".month");
const up = document.getElementById("angle-up");
const down = document.getElementById("angle-down");
const chartsDate = document.getElementById("charts-display-options");
const monthChosen = document.getElementById("month_chosen");
const monthYear = document.getElementById("year");
const displayGeneralSummary = document.getElementById("year_ended");
const displayMonthlySummary = document.getElementById("monthly");
const yearlySummaryDate = document.getElementById("yearly_summary_date");
const monthlySummaryDate = document.getElementById("monthly_summary_date");

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

// on click on months
for (let i = 0; i < months.length; i++) {
    months[i].addEventListener("click", () => {
        monthChosen.innerHTML = months[i].innerHTML;
        monthlySummaryDate.innerHTML = months[i].innerHTML;
        months[i].style.display = "none";
        monthYear.style.display = "flex";
        displayGeneralSummary.style.display = "none";
        displayMonthlySummary.style.display = "block";

        for (let j = 0; j < months.length; j++) {
            if (months[i] != months[j]) {
                months[j].style.display = "flex";
                months[i].style.display = "none";
            }
        }

        if (i == 0) {
            stories.data.labels = jan;
            stories.data.datasets[0].data = storiesJan;
            stories.options.title.text = 'Stories for January 2022';
            stories.update();

            drafts.data.labels = jan;
            drafts.data.datasets[0].data = draftsJan;
            drafts.options.title.text = 'Drafts for January 2022';
            drafts.update();

            bookmark.data.labels = jan;
            bookmark.data.datasets[0].data = bookmarksJan;
            bookmark.options.title.text = 'Bookmarks for January 2022';
            bookmark.update();

            views.data.labels = jan;
            views.data.datasets[0].data = viewsJan;
            views.options.title.text = 'Views for January 2022';
            views.update();

            like.data.labels = jan;
            like.data.datasets[0].data = likesJan;
            like.options.title.text = 'Likes for January 2022';
            like.update();

            comment.data.labels = jan;
            comment.data.datasets[0].data = commentsJan;
            comment.options.title.text = 'Comments for January 2022';
            comment.update();
        }
        if (i == 1) {
            stories.data.labels = feb;
            stories.data.datasets[0].data = storiesFeb;
            stories.options.title.text = 'Stories for Feburary 2022';
            stories.update();

            drafts.data.labels = feb;
            drafts.data.datasets[0].data = draftsFeb;
            drafts.options.title.text = 'Drafts for Feburary 2022';
            drafts.update();

            bookmark.data.labels = feb;
            bookmark.data.datasets[0].data = bookmarksFeb;
            bookmark.options.title.text = 'Bookmarks for Feburary 2022';
            bookmark.update();

            views.data.labels = feb;
            views.data.datasets[0].data = viewsFeb;
            views.options.title.text = 'Views for Feburary 2022';
            views.update();

            like.data.labels = feb;
            like.data.datasets[0].data = likesFeb;
            like.options.title.text = 'Likes for Feburary 2022';
            like.update();

            comment.data.labels = feb;
            comment.data.datasets[0].data = commentsFeb;
            comment.options.title.text = 'Comments for Feburary 2022';
            comment.update();
        } 
        if (i == 2) {
            stories.data.labels = mar;
            stories.data.datasets[0].data = storiesMar;
            stories.options.title.text = 'Stories for March 2022';
            stories.update();

            drafts.data.labels = mar;
            drafts.data.datasets[0].data = draftsMar;
            drafts.options.title.text = 'Drafts for March 2022';
            drafts.update();

            bookmark.data.labels = mar;
            bookmark.data.datasets[0].data = bookmarksMar;
            bookmark.options.title.text = 'Bookmarks for March 2022';
            bookmark.update();

            views.data.labels = mar;
            views.data.datasets[0].data = viewsMar;
            views.options.title.text = 'Views for March 2022';
            views.update();

            like.data.labels = mar;
            like.data.datasets[0].data = likesMar;
            like.options.title.text = 'Likes for March 2022';
            like.update();

            comment.data.labels = mar;
            comment.data.datasets[0].data = commentsMar;
            comment.options.title.text = 'Comments for March 2022';
            comment.update();
        } 
        if (i == 3) {
            stories.data.labels = apr;
            stories.data.datasets[0].data = storiesApr;
            stories.options.title.text = 'Stories for April 2022';
            stories.update();

            drafts.data.labels = apr;
            drafts.data.datasets[0].data = draftsApr;
            drafts.options.title.text = 'Drafts for April 2022';
            drafts.update();

            bookmark.data.labels = apr;
            bookmark.data.datasets[0].data = bookmarksApr;
            bookmark.options.title.text = 'Bookmarks for April 2022';
            bookmark.update();

            views.data.labels = apr;
            views.data.datasets[0].data = viewsApr;
            views.options.title.text = 'Views for April 2022';
            views.update();

            like.data.labels = apr;
            like.data.datasets[0].data = likesApr;
            like.options.title.text = 'Likes for April 2022';
            like.update();

            comment.data.labels = apr;
            comment.data.datasets[0].data = commentsApr;
            comment.options.title.text = 'Comments for April 2022';
            comment.update();
        }
        if (i == 4) {
            stories.data.labels = may;
            stories.data.datasets[0].data = storiesMay;
            stories.options.title.text = 'Stories for May 2022';
            stories.update();

            drafts.data.labels = may;
            drafts.data.datasets[0].data = draftsMay;
            drafts.options.title.text = 'Drafts for May 2022';
            drafts.update();

            bookmark.data.labels = may;
            bookmark.data.datasets[0].data = bookmarksMay;
            bookmark.options.title.text = 'Bookmarks for May 2022';
            bookmark.update();

            views.data.labels = may;
            views.data.datasets[0].data = viewsMay;
            views.options.title.text = 'Views for May 2022';
            views.update();

            like.data.labels = may;
            like.data.datasets[0].data = likesMay;
            like.options.title.text = 'Likes for May 2022';
            like.update();

            comment.data.labels = may;
            comment.data.datasets[0].data = commentsMay;
            comment.options.title.text = 'Comments for May 2022';
            comment.update();
        }
        if (i == 5) {
            stories.data.labels = jun;
            stories.data.datasets[0].data = storiesJun;
            stories.options.title.text = 'Stories for June 2022';
            stories.update();

            drafts.data.labels = jun;
            drafts.data.datasets[0].data = draftsJun;
            drafts.options.title.text = 'Drafts for June 2022';
            drafts.update();

            bookmark.data.labels = jun;
            bookmark.data.datasets[0].data = bookmarksJun;
            bookmark.options.title.text = 'Bookmarks for June 2022';
            bookmark.update();

            views.data.labels = jun;
            views.data.datasets[0].data = viewsJun;
            views.options.title.text = 'Views for June 2022';
            views.update();

            like.data.labels = jun;
            like.data.datasets[0].data = likesJun;
            like.options.title.text = 'Likes for June 2022';
            like.update();

            comment.data.labels = jun;
            comment.data.datasets[0].data = commentsJun;
            comment.options.title.text = 'Comments for June 2022';
            comment.update();
        }
        if (i == 6) {
            stories.data.labels = jul;
            stories.data.datasets[0].data = storiesJul;
            stories.options.title.text = 'Stories for July 2022';
            stories.update();

            drafts.data.labels = jul;
            drafts.data.datasets[0].data = draftsJul;
            drafts.options.title.text = 'Drafts for July 2022';
            drafts.update();

            bookmark.data.labels = jul;
            bookmark.data.datasets[0].data = bookmarksJul;
            bookmark.options.title.text = 'Bookmarks for July 2022';
            bookmark.update();

            views.data.labels = jul;
            views.data.datasets[0].data = viewsJul;
            views.options.title.text = 'Views for July 2022';
            views.update();

            like.data.labels = jul;
            like.data.datasets[0].data = likesJul;
            like.options.title.text = 'Likes for July 2022';
            like.update();

            comment.data.labels = jul;
            comment.data.datasets[0].data = commentsJul;
            comment.options.title.text = 'Comments for July 2022';
            comment.update();
        } 
        if (i == 7) {
            stories.data.labels = aug;
            stories.data.datasets[0].data = storiesAug;
            stories.options.title.text = 'Stories for August 2022';
            stories.update();

            drafts.data.labels = aug;
            drafts.data.datasets[0].data = draftsAug;
            drafts.options.title.text = 'Drafts for August 2022';
            drafts.update();

            bookmark.data.labels = aug;
            bookmark.data.datasets[0].data = bookmarksAug;
            bookmark.options.title.text = 'Bookmarks for August 2022';
            bookmark.update();

            views.data.labels = aug;
            views.data.datasets[0].data = viewsAug;
            views.options.title.text = 'Views for August 2022';
            views.update();

            like.data.labels = aug;
            like.data.datasets[0].data = likesAug;
            like.options.title.text = 'Likes for August 2022';
            like.update();

            comment.data.labels = aug;
            comment.data.datasets[0].data = commentsAug;
            comment.options.title.text = 'Comments for August 2022';
            comment.update();
        }
        if (i == 8) {
            stories.data.labels = sep;
            stories.data.datasets[0].data = storiesSep;
            stories.options.title.text = 'Stories for September 2022';
            stories.update();

            drafts.data.labels = sep;
            drafts.data.datasets[0].data = draftsSep;
            drafts.options.title.text = 'Drafts for September 2022';
            drafts.update();

            bookmark.data.labels = sep;
            bookmark.data.datasets[0].data = bookmarksSep;
            bookmark.options.title.text = 'Bookmarks for September 2022';
            bookmark.update();

            views.data.labels = sep;
            views.data.datasets[0].data = viewsSep;
            views.options.title.text = 'Views for September 2022';
            views.update();

            like.data.labels = sep;
            like.data.datasets[0].data = likesSep;
            like.options.title.text = 'Likes for September 2022';
            like.update();

            comment.data.labels = sep;
            comment.data.datasets[0].data = commentsSep;
            comment.options.title.text = 'Comments for September 2022';
            comment.update();
        } 
        if (i == 9) {
            stories.data.labels = oct;
            stories.data.datasets[0].data = storiesOct;
            stories.options.title.text = 'Stories for October 2022';
            stories.update();

            drafts.data.labels = oct;
            drafts.data.datasets[0].data = draftsOct;
            drafts.options.title.text = 'Drafts for October 2022';
            drafts.update();

            bookmark.data.labels = oct;
            bookmark.data.datasets[0].data = bookmarksOct;
            bookmark.options.title.text = 'Bookmarks for October 2022';
            bookmark.update();

            views.data.labels = oct;
            views.data.datasets[0].data = viewsOct;
            views.options.title.text = 'Views for October 2022';
            views.update();

            like.data.labels = oct;
            like.data.datasets[0].data = likesOct;
            like.options.title.text = 'Likes for October 2022';
            like.update();

            comment.data.labels = oct;
            comment.data.datasets[0].data = commentsOct;
            comment.options.title.text = 'Comments for October 2022';
            comment.update();
        } 
        if (i == 10) {
            stories.data.labels = nov;
            stories.data.datasets[0].data = storiesNov;
            stories.options.title.text = 'Stories for November 2022';
            stories.update();

            drafts.data.labels = nov;
            drafts.data.datasets[0].data = draftsNov;
            drafts.options.title.text = 'Drafts for November 2022';
            drafts.update();

            bookmark.data.labels = nov;
            bookmark.data.datasets[0].data = bookmarksNov;
            bookmark.options.title.text = 'Bookmarks for November 2022';
            bookmark.update();

            views.data.labels = nov;
            views.data.datasets[0].data = viewsNov;
            views.options.title.text = 'Views for November 2022';
            views.update();

            like.data.labels = nov;
            like.data.datasets[0].data = likesNov;
            like.options.title.text = 'Likes for November 2022';
            like.update();

            comment.data.labels = nov;
            comment.data.datasets[0].data = commentsNov;
            comment.options.title.text = 'Comments for November 2022';
            comment.update();
        } 
        if (i == 11) {
            stories.data.labels = dec;
            stories.data.datasets[0].data = storiesDec;
            stories.options.title.text = 'Stories for December 2022';
            stories.update();

            drafts.data.labels = dec;
            drafts.data.datasets[0].data = draftsDec;
            drafts.options.title.text = 'Drafts for December 2022';
            drafts.update();

            bookmark.data.labels = dec;
            bookmark.data.datasets[0].data = bookmarksDec;
            bookmark.options.title.text = 'Bookmarks for December 2022';
            bookmark.update();

            views.data.labels = dec;
            views.data.datasets[0].data = viewsDec;
            views.options.title.text = 'Views for December 2022';
            views.update();

            like.data.labels = dec;
            like.data.datasets[0].data = likesDec;
            like.options.title.text = 'Likes for December 2022';
            like.update();

            comment.data.labels = dec;
            comment.data.datasets[0].data = commentsDec;
            comment.options.title.text = 'Comments for December 2022';
            comment.update();
        }

    });
};

//on click on year ended
monthYear.addEventListener("click", () => {
    monthYear.style.display = "none";
    for (let i = 0; i < months.length; i++) {
        months[i].style.display = "flex";
        monthYear.style.display = "none";
        monthChosen.innerHTML = monthYear.innerHTML;
        yearlySummaryDate.innerHTML = monthYear.innerHTML;
        displayMonthlySummary.style.display = "none";
        displayGeneralSummary.style.display = "block";
    }
});


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
