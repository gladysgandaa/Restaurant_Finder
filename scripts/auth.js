//Add Admin cloud function
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", (e) => {
  //To not refresh the page
  e.preventDefault();

  const adminEmail = document.querySelector("#admin-email").value;
  //Calling index.js functions
  const addAdminRole = functions.httpsCallable("addAdminRole");
  addAdminRole({ email: adminEmail }).then((result) => {
    console.log(result);
  });
});

//To check if user is login or not, so it will appear a different display
auth.onAuthStateChanged((user) => {
  //If user is logged in
  if (user) {
    user.getIdTokenResult().then((idTokenResult) => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    //Get data ##NB: This is moved from db.js to only retrieved data when user is logged in
    //Change .get().then() ==> .onSnapshot
    //Meaning it will listen to every changes and update real time
    db.collection("restaurants").onSnapshot(
      (snapshot) => {
        setupRestaurants(snapshot.docs);
      },
      (error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error :" + errorMessage);
      }
    );
  }
  //If user is not logged in
  else {
    setupRestaurants([]);
    setupUI();
  }
});

//Contact Form
const contactForm = document.querySelector("#contact-form"); //NavBar ID for signup
contactForm.addEventListener("submit", (e) => {
  //To not refresh the page
  e.preventDefault();

  db.collection("contact")
    .add({
      Name: contactForm["contact-name"].value,
      Email: contactForm["contact-email"].value,
      Number: contactForm["contact-number"].value,
      Context: contactForm["contact-context"].value,
    })
    .then(() => {
      //Close the modal and reset form
      const modal = document.querySelector("#modal-contact");
      M.Modal.getInstance(modal).close();
      contactForm.reset();
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error :" + errorMessage);
    });
});

//SignUp Function
const signupForm = document.querySelector("#signup-form"); //NavBar ID for signup
signupForm.addEventListener("submit", (e) => {
  //To not refresh the page
  e.preventDefault();

  //Take the input
  const userEmail = signupForm["signup-email"].value;
  const userPass = signupForm["signup-password"].value;

  //Using auth variable in index, we call a function to sign up user
  auth
    .createUserWithEmailAndPassword(userEmail, userPass)
    .then((cred) => {
      //Make a bio to db for user
      return db.collection("users").doc(cred.user.uid).set({
        bio: signupForm["signup-bio"].value,
      });
    })
    // Create user db first THEN start below code
    .then(() => {
      //Close the signup modal and reset
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error :" + errorMessage);
    });
});

//LogOut Function
const logOut = document.querySelector("#logout"); //NavBar ID for LogOut
logOut.addEventListener("click", (e) => {
  //To not refresh the page
  e.preventDefault();

  //Using auth variable in index, we call a function to sign out user
  auth.signOut().catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error :" + errorMessage);
  });
});

//SignIn Function
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  //To not refresh the page
  e.preventDefault();

  //Take the input
  const userEmail = loginForm["login-email"].value;
  const userPass = loginForm["login-password"].value;

  auth
    .signInWithEmailAndPassword(userEmail, userPass)
    .then((cred) => {
      //Close the signup modal and reset
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error :" + errorMessage);
    });
});

//Create new restaurant
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  //To not refresh the page
  e.preventDefault();

  db.collection("restaurants")
    .add({
      name: createForm["name"].value,
      city: createForm["city"].value,
      category: createForm["category"].value,
      price: createForm["price"].value,
      description: createForm["description"].value,
      image: createForm["image"].value,
      address: createForm["address"].value,
      reviews: {user: "", note: ""} 
    })
    .then(() => {
      //Close the modal and reset form
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error :" + errorMessage);
    });
});

//Verification function
function sendVerification() {
  window.alert("Email sent");
  var user = auth.currentUser;
  user
    .sendEmailVerification()
    .then(function () {
      // Email sent.
    })
    .catch(function (error) {
      // An error happened.
    });
}

// Data Filtering



