//To check if user is login or not, so it will appear a different display
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        var user = firebase.auth().currentUser;
        if (user != null) {
            var email_id = user.email;
            var email_verified = user.emailVerified;
            if (email_verified) {
                document.getElementById("verified").style.display = "none";
            } else {
                document.getElementById("verified").style.display = "block";
            }
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id + " Verified : " + email_verified;
        }
    } else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block"
    }
});

//Login Function
function login() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error :" + errorMessage);
    });
}

//Logout function
function logout() {
    firebase.auth().signOut()
}

//Create account function
function createAccount() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error :" + errorMessage);
    });
}


//Verification Function
function sendVerification() {
    window.alert("Email sent");
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });
}