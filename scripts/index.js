//Getting guides data
const guideList = document.querySelector('.guides');

//Take data and cycle all
const setupGuides = (data) => {

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

    guideList.innerHTML = html ;
   
}



// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});