Restaurants.prototype.addRating = function(restaurantID, rating) {
    var collection = firebase.firestore().collection('restaurants');
    var document = collection.doc(restaurantID);
    var newRatingDocument = document.collection('ratings').doc();
  
    return firebase.firestore().runTransaction(function(transaction) {
      return transaction.get(document).then(function(doc) {
        var data = doc.data();
  
        var newAverage =
            (data.numRatings * data.avgRating + rating.rating) /
            (data.numRatings + 1);
  
        transaction.update(document, {
          numRatings: data.numRatings + 1,
          avgRating: newAverage
        });
        return transaction.set(newRatingDocument, rating);
      });
    });
  };
  