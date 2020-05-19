//Getting restaurant data
const restaurantList = document.querySelector('.restaurants');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if (user) {
        if(user.admin){
            adminItems.forEach(item => item.style.display ='block');
        }
        //Account info
        //To get access to bio from DB
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>Verified : ${user.emailVerified}</div>
            <div>Bio : ${doc.data().bio}</div>
            <div class="pink-text">Role : ${user.admin ? 'ADMIN' : 'USER'}</div>
            `;
            accountDetails.innerHTML = html;
        })

        //Toggle Logged In UI
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        const email_verified = user.emailVerified;
        if (email_verified) {
            document.getElementById("verified").style.display = "none";
        } else {
            document.getElementById("verified").style.display = "block";
        }
    }
    else {
        adminItems.forEach(item => item.style.display ='none');
        //Hide account info
        accountDetails.innerHTML = '';
        //Toggle Logged Out UI
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }

}



//Take data and cycle all in our index
const setupRestaurants = (data) => {

    //Check if there is data
    //If there is data, run below code
    if (data.length) {
        let html = '';
        //Loop every document 
        data.forEach(doc => {
            //data() to get details of the object in DB
            const restaurant = doc.data();
            const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${restaurant.name}</div>
            <div class="collapsible-body white">
            ${restaurant.city}
            ${restaurant.category}
            ${restaurant.price}</div>
        </li>
        `;
            html += li
        });
        restaurantList.innerHTML = html;
    }
    //Because no user is logged in, no data is fetched meaning data.length = 0 
    //Print this code below
    else {
        restaurantList.innerHTML = '<h5 class="center-align"> Login la boss</h5>';
    }
}



// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});