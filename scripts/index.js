const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {

    //To not refresh the page
    e.preventDefault();

    db.collection('restaurants').add({
        name: createForm['name'].value,
        city: createForm['city'].value,
        category: createForm['category'].value,
        price: createForm['price'].value,
        avgRating: createForm['avgRating'].value,   
        numRatings: createForm['numRating'].value
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