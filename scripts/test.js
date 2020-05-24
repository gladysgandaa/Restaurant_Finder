var firebaseConfig = {
    apiKey: "AIzaSyBMRTfK_7w3PZ3LfZCdWaqoEaA_CqZM5r4",
    authDomain: "form-50005.firebaseapp.com",
    databaseURL: "https://form-50005.firebaseio.com",
    projectId: "form-50005",
    storageBucket: "form-50005.appspot.com",
    messagingSenderId: "790644686206",
    appId: "1:790644686206:web:f0e8c087bd3ab7e95dc72f",
    measurementId: "G-CR41MFE7Q1",
};

firebase.initializeApp(firebaseConfig);
// Make auth and firestore reference
const auth = firebase.auth();
const db = firebase.firestore();

// //let restau = JSON.parse(sessionStorage.getItem('value'));
let post;
const id = sessionStorage.getItem("id");
const userID = sessionStorage.getItem("userEmail");
const userAdmin = sessionStorage.getItem("userAdmin");
console.log(id);
console.log(userID);
console.log(userAdmin);
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');

if(userAdmin != "admin"){
    loggedInLinks.forEach(item => item.style.display = 'none');
} else {
    loggedInLinks.forEach(item => item.style.display = 'block');
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});




db.collection("posts")
    .doc(id)
    .onSnapshot((snap) => {
        if (snap.exists) {
            post = snap.data();
            console.log("Document data:", post);


            // //assigning and displaying those values
            let name = document.querySelector('#name')
            name.innerHTML = post.postName
            let content = document.querySelector('#content')
            content.innerHTML = post.postContent
            let date = document.querySelector('#time')
            date.innerHTML = post.createdAt
            let author = document.querySelector('#author')
            author.innerHTML = post.author
            let youtube = post.youtube
            let reviewList = document.querySelector("#restaurantReview");

            var unique = Array.from(new Set(post.comment));

            let val;
            var results = [];
            var users = [];

            function getVideo() {
                $.ajax({
                    type: 'GET',
                    url: 'https://www.googleapis.com/youtube/v3/search',
                    data: {
                        key: 'AIzaSyBMRTfK_7w3PZ3LfZCdWaqoEaA_CqZM5r4',
                        q: post.youtube,
                        part: 'snippet',
                        maxResults: 1,
                        type: 'video',
                        videoEmbeddable: true,
                    },
                    success: function (data) {
                        embedVideo(data)
                    },
                    error: function (response) {
                        console.log("Request Failed");
                    }
                });
            }

            function embedVideo(data) {
                $('iframe').attr('src', 'https://www.youtube.com/embed/' + data.items[0].id.videoId)
                $('h3').text(data.items[0].snippet.title)
                $('.description').text(data.items[0].snippet.description)
            }

            getVideo();

            post.comment.forEach(function (rev) {
                console.log(rev.note);
                console.log(rev.user);
                results.push(rev.note);
                users.push(rev.user);
            })
            console.log(results)
            for (var i = 0; i < results.length; i++) {
                restauReview.innerHTML += "<p>" + results[i] + "</p><p>Reviewed by: " + users[i] + "</p><br>";
            }
        } else {
            console.log("No such document")
            // window.location.href = 'blog.html';
        }
    }
    )

const reviewForm = document.querySelector("#submitReview");
const review = document.querySelector("#review");
`import firebase from "firebase/firebase";`;

reviewForm.addEventListener("click", function (e) {
    const msg = review.value;
    console.log(msg);
    if (msg == "") {
        alert("Enter a review");
        return;
    }
    db.collection("posts")
        .doc(id)
        .update({
            comment: firebase.firestore.FieldValue.arrayUnion({
                user: userID,
                note: msg,
            }),
        });
    review.value = "";
    function clearBox(elementID) {
        document.getElementById(elementID).innerHTML = "";
    }
    clearBox("restauReview")
});

//Delete button
const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", function (e) {
    e.preventDefault() ;
    function deletePost() {
        var ask = window.confirm("Are you sure you want to delete this post?");
        if (ask) {
            db.collection('posts').doc(id).delete();
            window.alert("This post was successfully deleted. ");
            console.log(id)
        }
    }
    deletePost();
    setTimeout(function(){
        window.location.href = "/blog.html"
    },1000)

})