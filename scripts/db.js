//Get data
db.collection('guides').get().then(snapshot => {
    setupGuides(snapshot.docs);
});