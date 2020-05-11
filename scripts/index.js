const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if (user) {
        //Toggle Logged In UI
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    else {
        //Toggle Logged Out UI
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }

}

//Getting guides data
const guideList = document.querySelector('.guides');

//Take data and cycle all in our index
const setupGuides = (data) => {

    //Check if there is data
    //If there is data, run below code
    if (data.length) {
        let html = '';
        //Loop every document 
        data.forEach(doc => {
            //data() to get details of the object in DB
            const guide = doc.data();
            const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${guide.Title}</div>
            <div class="collapsible-body white">${guide.Content}</div>
        </li>
        `;
            html += li
        });
        guideList.innerHTML = html;
    }
    //Because no user is logged in, no data is fetched meaning data.length = 0 
    //Print this code below
    else {
        guideList.innerHTML = '<h5 class="center-align"> Login la boss</h5>';
    }
}



// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});