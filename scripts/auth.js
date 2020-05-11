//SignUp Function
const signupForm = document.querySelector('#signup-form'); //NavBar ID for signup
signupForm.addEventListener('submit', (e) => {

    //To not refresh the page
    e.preventDefault();
    const userEmail = signupForm['signup-email'].value;
    const userPass = signupForm['signup-password'].value;

    //Using auth variable in index, we call a function to sign up user
    auth.createUserWithEmailAndPassword(userEmail, userPass)
        .then(cred => {
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error :" + errorMessage);
        })

})


//LogOut method
const logOut = document.querySelector('#logout'); //NavBar ID for LogOut
logOut.addEventListener('click', (e) => {

    //To not refresh the page
    e.preventDefault();

    //Using auth variable in index, we call a function to sign out user
    auth.signOut()
        .then(() => {
            console.log("User signed out");
            window.alert("Succesfully signed out");
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error :" + errorMessage);
        })
})
