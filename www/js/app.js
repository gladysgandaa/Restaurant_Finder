const restaurantList = document.querySelector('#restaurant-list'); 
const form = document.querySelector('#add-restaurants-form');

// create element and render cafe
function renderRestaurant(doc){
    let li = document.createElement('li');
    let Name = document.createElement('span');
    let address = document.createElement('span');
    let avgRating = document.createElement('span');
    let category = document.createElement('span');
    let city = document.createElement('span');
    let numRatings = document.createElement('span');
    let photos = document.createElement('span');
    let price = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    Name.textContent = doc.data().Name;
    address.textContent = doc.data().address;
    avgRating.textContent = doc.data().avgRating;
    category.textContent = doc.data().category;
    city.textContent = doc.data().city;
    numRatings.textContent = doc.data().numRatings;
    photos.textContent = doc.data().photos;
    price.textContent = doc.data().price;

    li.appendChild(Name);
    li.appendChild(address);
    li.appendChild(avgRating);
    li.appendChild(category);
    li.appendChild(city);
    li.appendChild(numRatings);
    li.appendChild(photos);
    li.appendChild(price);
    
    restaurantList.appendChild(li);
}


//Getting Data
db.collection('Restaurants').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderRestaurant(doc);
    })
})


//Saving Data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Restaurants').add({
        Name: form.Name.value,
        address: form.address.value,
        // avgRating: form.avgRating.value,
        // category: form.category.value,
        // city: form.city.value,
        // numRatings: form.numRatings.value,
        // photos: form.photos.value,
        // price: form.price.value,
    })
    form.Name.value = '';
    form.address.value = '';
    // form.category.value = '';
    // form.city.value = '';
    // form.price.value = '';
})