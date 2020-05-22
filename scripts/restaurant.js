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

//   db.collection("restaurants").doc(id)
// .onSnapshot(function(doc) {
//     console.log("Current data: ", doc.data());
//     console.log("new message: ", doc.data().reviews )
// });

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
      //console.log(unique)
      // restau.reviews.map(rev =>{
      //     $('#restauReview p').remove()
      //     $('#restauReview').append("<p>" +rev.note+"</p><p><b>Reviewed By: </b>"+rev.user+"</p>")

      // })
      let val;

      restau.reviews.forEach(function (rev) {
        console.log(rev.note);
        val =
          "<p>" +
          rev.note +
          "</p><p><b>Reviewed By: </b>" +
          rev.user +
          "</p><hr>";
      });
      $("#restauReview").append(val);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  });

// db.collection("restaurants").doc(id)
// .get()
// .then(doc =>{
//   if (doc.exists) {
//   restau = doc.data()
//   console.log("Document data:", restau.name);

// let name = document.querySelector("#name");
// name.innerHTML = restau.name;
// let city = document.querySelector("#city");
// city.innerHTML = restau.city;
// let address = document.querySelector("#address");
// address.innerHTML = restau.address;
// let cat = document.querySelector("#category");
// cat.innerHTML = restau.category;
// let price = document.querySelector("#price");
// price.innerHTML = restau.price;
// let description = document.querySelector("#description");
// description.innerHTML = restau.description;
// let image = document.querySelector("#image");
// image.innerHTML = '<img src="' + restau.image + '" />';
// let reviewList = document.querySelector("#restauReview");

//   console.log(restau.name)
//  restau.reviews.forEach(function(rev) {
//      if(rev){
//         console.log(rev.note)
//         $('#restauReview').append("<p>" +rev.note+"</p><p><b>Reviewed By: </b>"+rev.user+"</p>")

//      }

//  })

// } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
// }

//   })

//Review Form
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
  db.collection("restaurants")
    .doc(id)
    .update({
      reviews: firebase.firestore.FieldValue.arrayUnion({
        user: userID,
        note: msg,
      }),
    });
  review.value = "";
  e.preventDefault();
});

//$("#submitReview").click(() => location.reload())

function initMap() {
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