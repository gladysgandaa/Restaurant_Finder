//Getting restaurant data
const restaurantList = document.querySelector('.restaurants');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

/* created an arraylist here so that it is global and i can 
pass the database info into this list and use it anyway on this page */
let postList = [
    {
        key: "",
        value: "",
    },
];

let userEmail = ""

const setupUI = (user) => {
    if (user) {
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
        }
        //Account info
        //To get access to bio from DB
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>Verified : ${user.emailVerified}</div>
            <div>Bio : ${doc.data().bio}</div>
            <div class="pink-text">Role : ${user.admin ? 'ADMIN' : 'USER'}</div>
            `;
            accountDetails.innerHTML = html;
            userEmail = user.email ; 
        });

        //Toggle Logged In UI
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        const email_verified = user.emailVerified;
        if (email_verified) {
            document.getElementById("verified").style.display = "none";
        } else {
            document.getElementById("verified").style.display = "block";
        }
    } else {
        adminItems.forEach(item => item.style.display = 'none');
        //Hide account info
        accountDetails.innerHTML = '';
        //Toggle Logged Out UI
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }

}



//Take data and cycle all in our index
const setupPosts = (data) => {

    //Check if there is data
    //If there is data, run below code
    if (data.length) {
        //window.location.href = '/restau.html'
        let html = '';
        let html2 = '';
        //Loop every document 
        data.forEach(doc => {
            //data() to get details of the object in DB
            const post = doc.data();

            //PASSING THE DATABASE INFO INTO THE LIST, DATABASE INFO TYPE IS AN OBJECT 
            postList.push({
                key: doc.id,
                value: post,
            })
            //postList += post;
            const li = `
        <div class="col-sm-4 col-md-4 col-lg-4">
        <div class="card">
        <div class="card-body">
            <a class="card-title" onClick="showPage(this)">${post.postName}</a>
            <p class="card-text">${post.postContent}</p>
            <p class="card-text">${post.author}</p>
        </div>
        </div>
        </div>

        `;

            html += li
        });
        console.log(postList)
        restaurantList.innerHTML = html;
    }
    //Because no user is logged in, no data is fetched meaning data.length = 0 
    //Print this code below
    else {
        restaurantList.innerHTML = '<h5 class="center-align">Please Login or Sign up </h5>';
    }
}



// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});

//created a function that i call when a display restaurant is clicked 
function showPage(link) {
    //when a restaurant is clicked i get the restaurant name which is passed as argument 
    console.log(link.innerText)
    let listValue = {};

    /* loop through my array list of restaurant data to find 
    the restaurant that has same restaurant name as that of the button clicked */

    postList.forEach(function (post) {
        if (post.value.postName === link.innerText) {
            console.log("Found U: ", post.value.postName);
            listValue = post.value;
            console.log(listValue);

            sessionStorage.setItem("id", post.key);
            sessionStorage.setItem("value", JSON.stringify(listValue));
            sessionStorage.setItem("userEmail", userEmail);
            console.log(userEmail)
        }
        location.replace("/content.html?id=" + link.innerText);
    })
    // for (let [key, value] of Object.entries(postList)) {


    //     if (`${value.postName}` === link.innerText) {
    //         console.log("found u: " + `${value.postName}`)
    //         //this variable listValue can be deleted as u can just use value from resList here
    //         listValue = value
    //         console.log(listValue)

    //         /* in other to use the values of restaurant on another page i need to save them in session
    //         and also i need to make sure i have the original database complete values hence why am using
    //         JSON as the database values are objects and session only stores strings */

    //         //here am passing the whole object values from the database 
    //         sessionStorage.setItem("value", JSON.stringify(listValue));


    //         //THIS COMMENTED OUT CODE SHOWS HOW TO PASS SINGLE VALUES OF TYPE STRING
    //         //sessionStorage.setItem("value", `${value}`);
    //         // sessionStorage.setItem("name", listValue.name);
    //         // sessionStorage.setItem("city", listValue.city);
    //         // sessionStorage.setItem("category", listValue.category);
    //         // sessionStorage.setItem("price", listValue.price);
    //     }

    // }

    // //redirecting to another page with id showing up in the url to tell u what u r viewing
    // location.replace("/content.html?id=" + link.innerText)
}

// function initMap() {
//     // Initialize and add the map
//     var firebaseConfig = {
//         apiKey: "AIzaSyBMRTfK_7w3PZ3LfZCdWaqoEaA_CqZM5r4",
//         authDomain: "form-50005.firebaseapp.com",
//         databaseURL: "https://form-50005.firebaseio.com",
//         projectId: "form-50005",
//         storageBucket: "form-50005.appspot.com",
//         messagingSenderId: "790644686206",
//         appId: "1:790644686206:web:f0e8c087bd3ab7e95dc72f"
//     };
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);
//     const db = firebase.firestore();

//     var restaurants = [{}]

//     // The location of Uluru


//     db.collection('restaurants').get().then(docs => {
//         docs.forEach((coord) => {

//             if (coord.data()["Location"]) {

//                 restaurants["RestaurantName"] = coord.data()["Name"];
//                 restaurants["Location"] = coord.data()["Location"];
//             }
//         })

//         var sessionData = JSON.parse(sessionStorage.getItem("value"))
//         console.log(sessionData)
//         var latitude = sessionData["Location"]["Pc"]
//         var longitude = sessionData["Location"]["Vc"]
//         var victoria = {
//             lat: latitude,
//             lng: longitude
//         };
//         // The map, centered at Uluru
//         var map = new google.maps.Map(
//             document.getElementById('map'), {
//             zoom: 12,
//             center: victoria
//         });
//         // The marker, positioned at Uluru
//         var marker = new google.maps.Marker({
//             position: victoria,
//             map: map
//         });
//         marker.setMap(map);

//     })

// }



// function upload() {
//     var image = document.getElementById("image").files[0];

//     var imageName = image.name

//     var storageRef = firebase.storage().ref("images/" + imageName);

//     var uploadTask = storageRef.put(image);

//     uploadTask.on("state_changed", function (snapshot) {
//         var progress = (snapshot.bytesTransfereed / snapshot) * 100;
//         console.log("upload is" + progress + "done");
//     }, function (error) {
//         console.log(error.message);
//     }, function () {
//         uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//             console.log(downloadURL);
//         });
//     })
// }

// function getDownloadURL(url) {
//     var StarsRef = storageRef.child('images/' + file.name);
//     starsRef.getDownloadURL().then(function (url) {
//         document.querySelector('#preview').src = url;
//         var t = document.querySelector('p');
//         t.innerHTML = '<b>Firebase Storage URL: </b>' + url
//     }).catch(function (error) {
//         console.log('Error Downloading File');
//     });
// }