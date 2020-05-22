//Getting restaurant data
const restaurantList = document.querySelector(".restaurants");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");
const adminItems = document.querySelectorAll(".admin");

/* created an arraylist here so that it is global and i can 
pass the database info into this list and use it anyway on this page */
let resList = [{
    key: '',
    value: ''
}];

let userID = ''

const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach((item) => (item.style.display = "block"));
    }
    //Account info
    //To get access to bio from DB
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
            <div>Logged in as ${user.email}</div>
            <div>Verified : ${user.emailVerified}</div>
            <div>Bio : ${doc.data().bio}</div>
            <div class="pink-text">Role : ${user.admin ? "ADMIN" : "USER"}</div>
            `;
        accountDetails.innerHTML = html;
        userID = user.email
      });

    //Toggle Logged In UI
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
    const email_verified = user.emailVerified;
    
    if (email_verified) {
      document.getElementById("verified").style.display = "none";
    } else {
      document.getElementById("verified").style.display = "block";
    }
  } else {
    adminItems.forEach((item) => (item.style.display = "none"));
    //Hide account info
    accountDetails.innerHTML = "";
    //Toggle Logged Out UI
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};

//Take data and cycle all in our index
const setupRestaurants = (data) => {
  //Check if there is data
  //If there is data, run below code
  if (data.length) {
    //window.location.href = '/restau.html'
    let html = "";
    //Loop every document
    data.forEach((doc) => {
      //data() to get details of the object in DB
      const restaurant = doc.data();
        //console.log(doc.id)
      //PASSING THE DATABASE INFO INTO THE LIST, DATABASE INFO TYPE IS AN OBJECT
    resList.push({key: doc.id,
            value: restaurant});
      //resList += restaurant;
      const li = `
        <div class="col-sm-4 col-md-4 col-lg-4">
        <div class="card">
        <img class="card-img-top" src=${restaurant.image} alt="Card image cap">
        <div class="card-body">
            <a class="card-title" onClick="showPage(this)">${restaurant.name}</a>
            <p class="card-text">${restaurant.address}</p>
        </div>
        </div>
        </div>
        `;

      html += li;
    });
    console.log(resList);
    restaurantList.innerHTML = html;
  }
  //Because no user is logged in, no data is fetched meaning data.length = 0
  //Print this code below
  else {
    restaurantList.innerHTML =
      '<h5 class="center-align">Please Login or Sign up </h5>';
  }
};


// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

//created a function that i call when a display restaurant is clicked
function showPage(link) {
  //when a restaurant is clicked i get the restaurant name which is passed as argument
  console.log(link.innerText);
  let listValue = {};
    
  /* loop through my array list of restaurant data to find 
    the restaurant that has same restaurant name as that of the button clicked */

    resList.forEach( function(restau){
       // console.log(restau.key)
        //console.log(restau.value.name)
        if (restau.value.name === link.innerText) {
            console.log("found u: " + restau.value.name);
            //this variable listValue can be deleted as u can just use value from resList here
            listValue = restau.value;
            console.log(listValue);
      
            /* in order to use the values of restaurant on another page i need to save them in session
                  and also i need to make sure i have the original database complete values hence why am using
                  JSON as the database values are objects and session only stores strings */
      
            //here am passing the whole object values from the database
            sessionStorage.setItem('id', restau.key);
            sessionStorage.setItem('value', JSON.stringify(listValue));
            sessionStorage.setItem('userID', userID)
            //console.log(userID)
            
          }
            //redirecting to another page with id showing up in the url to tell u what u r viewing
            location.replace("/restau.html?id=" + link.innerText);
    })



    }

function initMap() {
  // Initialize and add the map
  var firebaseConfig = {
    apiKey: "AIzaSyBMRTfK_7w3PZ3LfZCdWaqoEaA_CqZM5r4",
    authDomain: "form-50005.firebaseapp.com",
    databaseURL: "https://form-50005.firebaseio.com",
    projectId: "form-50005",
    storageBucket: "form-50005.appspot.com",
    messagingSenderId: "790644686206",
    appId: "1:790644686206:web:f0e8c087bd3ab7e95dc72f",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  var restaurants = [{}];

  // The location of Uluru

  db.collection("restaurants")
    .get()
    .then((docs) => {
      docs.forEach((coord) => {
        if (coord.data()["Location"]) {
          restaurants["RestaurantName"] = coord.data()["Name"];
          restaurants["Location"] = coord.data()["Location"];
        }
      });

      var sessionData = JSON.parse(sessionStorage.getItem("value"));
      console.log(sessionData);
      
    // var directionsDisplay = new google.maps.DirectionsRenderer();
    // var directionsService = new google.maps.DirectinosService();

      var latitude = sessionData["Location"]["Pc"];
      var longitude = sessionData["Location"]["Vc"];
      var victoria = {
        lat: latitude,
        lng: longitude,
      };
      // The map, centered at Uluru
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: victoria,
      });

      var contentString = "Restaurant";

      var infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      // The marker, positioned at Uluru
      var marker = new google.maps.Marker({
        position: victoria,
        map: map,
      });
      marker.setMap(map);
      marker.addListener("click", function () {
        infowindow.open(map, marker);
      });

      const initialPosition = {
        lat: 59.325,
        lng: 18.069,
      };
      const marker2 = new google.maps.Marker({
        map,
        position: initialPosition,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        },
      });

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(
              `Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`
            );

            // Set marker's position.
            marker2.setPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });

            // Center map to user's position.
            map.panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (err) =>
            alert(`Error (${err.code}): ${getPositionErrorMessage(err.code)}`)
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }

      // directionsDisplay.setMap(map);

    });

    // function calculateRoute(){
    //     var request = { 
    //         origin: initialPosition,
    //         destination: victoria,
    //         travelMode: 'DRIVING'
    //     };

    //     directionsService.route(request, function(result, status){
    //         console.log(result, status)
    //     });
    // }

    // document.getElementById('get').onclick = function(){
    //     calculateRoute;
    // };
    
}


function upload() {
  var image = document.getElementById("image").files[0];

  var imageName = image.name;

  var storageRef = firebase.storage().ref("images/" + imageName);

  var uploadTask = storageRef.put(image);

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransfereed / snapshot) * 100;
      console.log("upload is" + progress + "done");
    },
    function (error) {
      console.log(error.message);
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log(downloadURL);
      });
    }
  );
}

function getDownloadURL(url) {
  var StarsRef = storageRef.child("images/" + file.name);
  starsRef
    .getDownloadURL()
    .then(function (url) {
      document.querySelector("#preview").src = url;
      var t = document.querySelector("p");
      t.innerHTML = "<b>Firebase Storage URL: </b>" + url;
    })
    .catch(function (error) {
      console.log("Error Downloading File");
    });
}

function filter(){
    var FilterValue, input, div, i;

    input = document.getElementById('search');
    FilterValue = input.value().toUpperCase();
    div = document.getElementsByClassName('restaurants');

    for(i=0; i<div.length; i++){
        var a = div[i].getElementsBy
    }
}