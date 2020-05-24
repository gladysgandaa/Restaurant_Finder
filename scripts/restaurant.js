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
      //console.log(unique)
      // restau.reviews.map(rev =>{
      //     $('#restauReview p').remove()
      //     $('#restauReview').append("<p>" +rev.note+"</p><p><b>Reviewed By: </b>"+rev.user+"</p>")

      // })
      let val;
      var results = [];
      var users = [];

      // const reviewForm = document.querySelector("#submitReview");
      // const review = document.querySelector("#review");
      // `import firebase from "firebase/firebase";`;

      // reviewForm.addEventListener("click", function (e) {
      //   const msg = review.value;
      //   console.log(msg);
      //   if (msg == "") {
      //     return;
      //   }
      //   db.collection("restaurants")
      //     .doc(id)
      //     .update({
      //       reviews: firebase.firestore.FieldValue.arrayUnion({
      //         user: userID,
      //         note: msg,
      //       }),
      //     });
      //   review.value = "";

      //   function clearBox(elementID) {
      //     document.getElementById(elementID).innerHTML = "";
      //   }
      //   clearBox("restauReview")
      // });

      restau.reviews.forEach(function (rev) {
        console.log(rev.note);
        console.log(rev.user);
        results.push(rev.note);
        users.push(rev.user);
        // console.log(results);

        // val =
        //   "<p>" +
        //   rev.note +
        //   "</p><p><b>Reviewed By: </b>" +
        //   rev.user +
        //   "</p><hr>";
      });

      console.log(results);



      for (var i = 0; i < results.length; i++) {
        restauReview.innerHTML += "<p>" + results[i] + "</p><p>Reviewed by: " + users[i] + "</p><br>";
      }

      // for (var i = 0; i < arr.length; i++)
      // restauReview.innerHTML += "<p>" + arr[i] + "</p><br>";

      // var arrayLength = results.length;
      // for (var i = 0; i < arrayLength; i++) {
      //   console.log(results[i]);
      //   console.log(users[i]);
      //   console.log("hi")
      //   console.log("=========================================")
      //   // val =
      //   //   "<p>" +
      //   //   results[i] +
      //   //   "</p><p><b>Reviewed By: </b>" +
      //   //   users[i] +
      //   //   "</p><hr>";
      //   holder.innerHTML += "<p>" + results[i] + "</p><br><p> Reviewed By :" + users[i] + "</p></hr>";
      //   //Do something
      // }




      // $("#restauReview").append(val);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  });




//$("#submitReview").click(() => location.reload())

function haversine_distance(Marker1, Marker2) {
  var R = 6371.071; // Radius of the Earth in miles
  var rlat1 = Marker1.position.lat() * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = Marker2.position.lat() * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon =
    (Marker2.position.lng() - Marker1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

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

// Initialize MAP
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
      var Marker1 = new google.maps.Marker({
        position: victoria,
        map: map,
      });
      Marker1.setMap(map);
      Marker1.addListener("click", function () {
        infowindow.open(map, Marker1);
      });

      const initialPosition = {
        lat: -37.81427,
        lng: 144.947554,
      };
      const Marker2 = new google.maps.Marker({
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

            console.log(position.coords.latitude);

            // Set marker's position.
            var userLatLng = new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            Marker2.setPosition({
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

      var distance = haversine_distance(Marker1, Marker2);
      document.getElementById("msg").innerHTML =
        distance.toFixed(2) + " km away";

      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map); // Existing map object displays directions
      // Create route from existing points used for markers
      const route = {
        origin: initialPosition,
        destination: victoria,
        travelMode: "DRIVING",
      };

      directionsService.route(route, function (response, status) {
        // anonymous function to capture directions
        if (status !== "OK") {
          window.alert("Directions request failed due to " + status);
          return;
        } else {
          directionsRenderer.setDirections(response); // Add route to the map
          var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
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
    });
}
