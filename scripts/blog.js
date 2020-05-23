//Getting restaurant data
const restaurantList = document.querySelector(".restaurants");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");
const adminItems = document.querySelectorAll(".admin");

/* created an arraylist here so that it is global and i can 
pass the database info into this list and use it anyway on this page */
let postList = [
  {
    key: "",
    value: "",
  },
];

let userEmail = "";

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
        userEmail = user.email;
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
const setupPosts = (data) => {
  //Check if there is data
  //If there is data, run below code
  if (data.length) {
    //window.location.href = '/restau.html'
    let html = "";
    let html2 = "";
    //Loop every document
    data.forEach((doc) => {
      //data() to get details of the object in DB
      const post = doc.data();

      //PASSING THE DATABASE INFO INTO THE LIST, DATABASE INFO TYPE IS AN OBJECT
      postList.push({
        key: doc.id,
        value: post,
      });
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

      html += li;
    });
    console.log(postList);
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

  postList.forEach(function (post) {
    if (post.value.postName === link.innerText) {
      console.log("Found U: ", post.value.postName);
      listValue = post.value;
      console.log(listValue);

      sessionStorage.setItem("id", post.key);
      sessionStorage.setItem("value", JSON.stringify(listValue));
      sessionStorage.setItem("userEmail", userEmail);
      console.log(userEmail);
    }
    location.replace("/content.html?id=" + link.innerText);
  });
}
