//Getting restaurant data
const restaurantList = document.querySelector(".restaurants");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const whatsonLinks = document.querySelectorAll(".whats-on");
const accountDetails = document.querySelector(".account-details");
const adminItems = document.querySelectorAll(".admin");
const filterSection = document.querySelector(".filter-section");
const deleteButton = document.querySelectorAll('.delete')


/* created an arraylist here so that it is global and i can 
pass the database info into this list and use it anyway on this page */
let resList = [
  {
    key: "",
    value: "",
  },
];

let userID = "";
let userAdmin = "";


const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach((item) => (item.style.display = "block"));
      deleteButton.forEach(item => item.style.display = 'block');
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
        userID = user.email;
        if (user.admin) {
          userAdmin = "admin"
        } else {
          userAdmin = "not admin 1"
        }
      });

    //Toggle Logged In UI
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
    whatsonLinks.forEach((item) => (item.style.display = "block"));

    const email_verified = user.emailVerified;
    if (email_verified) {
      document.getElementById("verified").style.display = "none";
      document.getElementById("verify").style.display = "block";
      document.getElementById("verify2").style.display = "none";
    } else {
      document.getElementById("verified").style.display = "block";
      document.getElementById("verify").style.display = "none";
      document.getElementById("verify2").style.display = "block";
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
    let html2 = "";
    //Loop every document
    data.forEach((doc) => {
      //data() to get details of the object in DB
      const restaurant = doc.data();
      //console.log(doc.id)
      //PASSING THE DATABASE INFO INTO THE LIST, DATABASE INFO TYPE IS AN OBJECT
      resList.push({
        key: doc.id,
        value: restaurant,
      });
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

      // const filter = `

      // `

      html += li;
      // html2 = filter;
    });
    console.log(resList);
    restaurantList.innerHTML = html;
    filterSection.style.visibility = "visible";
  }
  //Because no user is logged in, no data is fetched meaning data.length = 0
  //Print this code below
  else {
    restaurantList.innerHTML =
      '<h5 class="center-align">Please Login or Sign up </h5>';
    filterSection.style.visibility = "hidden";
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

  resList.forEach(function (restau) {
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
      sessionStorage.setItem("id", restau.key);
      sessionStorage.setItem("value", JSON.stringify(listValue));
      sessionStorage.setItem("userID", userID);
      sessionStorage.setItem("userAdmin",userAdmin);
      console.log(userAdmin)
      //console.log(userID)
    }
    //redirecting to another page with id showing up in the url to tell u what u r viewing
    location.replace("/restau.html?id=" + link.innerText);
  });
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

// Data Filtering
var query = db.collection("restaurants");

function renderFilter() {
  query
    .get()
    .then(function (querySnapshot) {
      let html = "";
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const restaurant = doc.data();
        //console.log(doc.id)
        //PASSING THE DATABASE INFO INTO THE LIST, DATABASE INFO TYPE IS AN OBJECT
        resList.push({
          key: doc.id,
          value: restaurant,
        });
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
      restaurantList.innerHTML = html;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
}

$(".filter").click(function () {
  const search = $(this).text();

  if (
    search == "Fast Food" ||
    search == "Japanese" ||
    search == "Brunch" ||
    search == "Fusion"
  ) {
    console.log(search);
    db.collection("restaurants")
      .where("category", "==", search)
      .get()
      .then(function (querySnapshot) {
        let html = "";
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const restaurant = doc.data();
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
        restaurantList.innerHTML = html;
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  } else if (search == "All") {
    console.log(search);

    db.collection("restaurants")
      .get()
      .then((snap) => {
        let html = "";
        snap.forEach((doc) => {
          console.log(doc.data());
          console.log(doc.id);

          const restaurant = doc.data();
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
        restaurantList.innerHTML = html;
      });
  } else if (
    search == "Melbourne" ||
    "St Kilda" ||
    "Fitzroy" ||
    "Brunswick" ||
    "Windsor" ||
    "Richmond"
  ) {
    console.log(search);
    db.collection("restaurants")
      .where("city", "==", search)
      .get()
      .then(function (querySnapshot) {
        let html = "";
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          const restaurant = doc.data();
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
        restaurantList.innerHTML = html;
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  if (
    search == "$" ||
    search == "$$" ||
    search == "$$$" ||
    search == "$$$$" ||
    search == "$$$$$"
  ) {
    console.log(search);
    db.collection("restaurants")
      .where("price", "==", search)
      .get()
      .then(function (querySnapshot) {
        let html = "";
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const restaurant = doc.data();
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
        restaurantList.innerHTML = html;
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }
});
