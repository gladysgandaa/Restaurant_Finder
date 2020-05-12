//To check if user is login or not, so it will appear a different display
auth.onAuthStateChanged(user => {
    //If user is logged in
    if (user) {
        //Get data ##NB: This is moved from db.js to only retrieved data when user is logged in
        //Change .get().then() ==> .onSnapshot
        //Meaning it will listen to every changes and update real time
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        });
    }
    //If user is not logged in
    else {
        setupGuides([]);
        setupUI();
    }
})


//SignUp Function
const signupForm = document.querySelector('#signup-form'); //NavBar ID for signup
signupForm.addEventListener('submit', (e) => {

    //To not refresh the page
    e.preventDefault();

    //Take the input
    const userEmail = signupForm['signup-email'].value;
    const userPass = signupForm['signup-password'].value;

    //Using auth variable in index, we call a function to sign up user
    auth.createUserWithEmailAndPassword(userEmail, userPass)
        .then(cred => {
            //Close the signup modal and reset 
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


//LogOut Function
const logOut = document.querySelector('#logout'); //NavBar ID for LogOut
logOut.addEventListener('click', (e) => {

    //To not refresh the page
    e.preventDefault();

    //Using auth variable in index, we call a function to sign out user
    auth.signOut()
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error :" + errorMessage);
        })
})

//SignIn Function
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {

    //To not refresh the page
    e.preventDefault();

    //Take the input
    const userEmail = loginForm['login-email'].value;
    const userPass = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(userEmail, userPass)
        .then(cred => {
            //Close the signup modal and reset 
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error :" + errorMessage);
        })

})


//Create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {

    //To not refresh the page
    e.preventDefault();

    db.collection('guides').add({
        Title: createForm['title'].value,
        Content: createForm['content'].value
    }).then(() => {
        //Close the modal and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error :" + errorMessage);
    })

})