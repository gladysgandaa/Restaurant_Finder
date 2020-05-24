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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Make auth and firestore reference
const auth = firebase.auth();
const db = firebase.firestore();

//let restau = JSON.parse(sessionStorage.getItem('value'));
let restau;
const id = sessionStorage.getItem("id");
const userID = sessionStorage.getItem("userID");
console.log(id);


//Review Form
const reviewForm = document.querySelector("#submitReview");
const review = document.querySelector("#review");
`import firebase from "firebase/firebase";`;

reviewForm.addEventListener("click", function (e) {
  const msg = review.value;
  console.log(msg);
  if (msg == "") {
    return;
  }
  db.collection("restaurants")
    .doc(id)
    .update({
      reviews: firebase.firestore.FieldValue.arrayUnion({
        user: userID,
        note: msg,
      }),
    });
  review.value = "";

  //Delete innerHTML to not re-print the innerHTML
  function clearBox(elementID) {
    document.getElementById(elementID).innerHTML = "";
  }
  clearBox("restauReview")
});


db.collection("restaurants")
  .doc(id)
  .onSnapshot((snap) => {
    if (snap.exists) {
      restau = snap.data();
      console.log("Document data:", restau);

      let name = document.querySelector("#name");
      name.innerHTML = restau.name;
      let city = document.querySelector("#city");
      city.innerHTML = restau.city;
      let address = document.querySelector("#address");
      address.innerHTML = restau.address;
      let cat = document.querySelector("#category");
      cat.innerHTML = restau.category;
      let price = document.querySelector("#price");
      price.innerHTML = restau.price;
      let description = document.querySelector("#description");
      description.innerHTML = restau.description;
      let image = document.querySelector("#image");
      image.innerHTML = '<img src="' + restau.image + '" />';
      let reviewList = document.querySelector("#restauReview");

      var unique = Array.from(new Set(restau.reviews));
      let val;
      var results = [];
      var users = [];


      restau.reviews.forEach(function (rev) {
        results.push(rev.note);
        users.push(rev.user);
      });

      console.log(results);



      for (var i = 0; i < results.length; i++) {
        restauReview.innerHTML += "<p>" + results[i] + "</p><p>Reviewed by: " + users[i] + "</p><br>";
      }
    } else {
      console.log("No such document!");
    }
  });


function haversine_distance(marker1, marker2) {
  var R = 6371.071; // Radius of the Earth in miles
  var rlat1 = marker1.position.lat() * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = marker2.position.lat() * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon =
    (marker2.position.lng() - marker1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
        Math.cos(rlat1) *
        Math.cos(rlat2) *
        Math.sin(difflon / 2) *
        Math.sin(difflon / 2)
      )
    );
  return d;
}


x = navigator.geolocation;
x.getCurrentPosition(success,failure);

function success(position){
  var restaurants = [{}];
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

  var myLat = position.coords.latitude;
  var myLong = position.coords.longitude;


  var coords = new google.maps.LatLng(myLat,myLong);
  var rest = new google.maps.LatLng(latitude,longitude);
  var latitude = sessionData["Location"]["Pc"];
  var longitude = sessionData["Location"]["Vc"];
  var victoria = {
    lat: latitude,
    lng: longitude,
  };
  var user = {
    lat: myLat,
    lng: myLong,
  }

  var contentString = "Restaurant";

  var infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  console.log(victoria);
  console.log(user);

  var mapOptions = {
    zoom:9,
    center: coords,
    mapType: google.maps.MapTypeId.ROADMAP
  }
  
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker1 = new google.maps.Marker({
    position: user,
    map: map
  })
  var marker2 = new google.maps.Marker({
    position: victoria,
    map: map,
  });
  marker1.setMap(map);
  marker2.setMap(map);

    var distance = haversine_distance(marker1, marker2);
    document.getElementById("msg").innerHTML =
    distance.toFixed(2) + " km away";

    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    const route = {
      origin: user,
      destination: victoria,
      travelMode: "DRIVING",
    };

    directionsService.route(route, function (response, status) {
      if (status !== "OK") {
        window.alert("Directions request failed due to " + status);
        return;
      } else {
        directionsRenderer.setDirections(response);
        var directionsData = response.routes[0].legs[0];
        if (!directionsData) {
          window.alert("Directions request failed");
          return;
        } else {
          document.getElementById("msg").innerHTML +=
            "<br>Driving distance is " +
            directionsData.distance.text +
            " (" +
            directionsData.duration.text +
            ").";
        }
      }
    });
})
}



function failure(){}

