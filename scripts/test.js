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
console.log(id);
console.log(userID);





db.collection("posts")
    .doc(id)
    .onSnapshot((snap) => {
        if (snap.exists) {
            post = snap.data();
            console.log("Document data:", post);


            // //assigning and displaying those values
            let name = document.querySelector('#name')
            name.innerHTML = post.postName
            let content = document.querySelector('#city')
            content.innerHTML = post.postContent
            let date = document.querySelector('#address')
            date.innerHTML = post.createdAt
            let author = document.querySelector('#category')
            author.innerHTML = post.author
            let youtube = post.youtube
            let reviewList = document.querySelector("#restaurantReview");

            var unique = Array.from(new Set(post.reviews));

            let val;
            
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

            post.reviews.forEach(function (rev) {

                console.log(rev.note);
                val =
                    "<p>" +
                    rev.note +
                    "</p><p><b>Reviewed By: </b>" +
                    rev.user +
                    "</p><hr>";
            })

            $("#restauReview").append(val);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })

