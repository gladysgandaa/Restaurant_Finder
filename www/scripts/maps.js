function initMap() {
    // Initialize and add the map
    
        var restaurants = [{}]
    
        // The location of Uluru
        
        db.collection('restaurants').get().then(docs => {
            docs.forEach((coord) => {
    
                if(coord.data()["Location"]){
                    console.log(coord.data());
                    restaurants["RestaurantName"] = coord.data()["Name"];
                    restaurants["Location"] = coord.data()["Location"];
                    // latitude = coord.data()["Location"]["latitude"]
                    // longitude = coord.data()["Location"]["longitude"]
    
                }
             })
    
    
            var victoria = {lat: restaurants["Location"]["latitude"],lng:restaurants["Location"]["longitude"]};
            // The map, centered at Uluru
            var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 12, center: victoria});
            // The marker, positioned at Uluru
            var marker = new google.maps.Marker({position: victoria, map: map});
            marker.setMap(map);
    
            })
           
      }