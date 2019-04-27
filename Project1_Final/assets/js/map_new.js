var coords = {
    latCoords: [40.763574, 40.763590, 40.762751, 40.763117, 40.764407],
    lngCoords: [-73.913935, -73.914686, -73.913517, -73.912463, -73.914375],
    name: ['Smith', 'Wollensky', 'Bernadin', 'Pegasus', 'Guinesses'],
    sale: [true, false, false, true, false]

}
    function initMap() {
      // Map options
      var options = {
        zoom: 13,
        center: { lat: 40.7549, lng: -73.9840 }
      }
      // New map
      var map = new google.maps.Map(document.getElementById('map'), options);
      // Listen for click on map
      google.maps.event.addListener(map, 'click', function (event) {
        // Add marker
        addMarker({ coords: event.latLng });
      });
      
      var config = {
        apiKey: "AIzaSyDc09T-OmJie6bBbWkx0FWsPT9Mk10ROp0",
        authDomain: "happy-hour-proje-1551302378847.firebaseapp.com",
        databaseURL: "https://happy-hour-proje-1551302378847.firebaseio.com",
        projectId: "happy-hour-proje-1551302378847",
        storageBucket: "happy-hour-proje-1551302378847.appspot.com",
        messagingSenderId: "650709499185"
      };
      firebase.initializeApp(config);
      // localStorage.setItem('logged-in-user', "SMViKPVcOHb2VP7YIMp9DWS1dSx1");
      //     var tblrestaurant = document.getElementById('tbl_restaurant_info');
      var databaseRef = firebase.database().ref('/restaurants/');
      var rowIndex = 1;
      // listening for event value change
      
      function displayMarkers(){
        for (var i = 0; i < markers.length; i++) {
              // Add marker
              console.log(markers)
              addMarker(markers[i]);
            }
      }
      databaseRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          if (childData.user_id === "-L_AF--wreUG4JwFyHBZ") {
            markers[0].iconImage = (childData.activeImage);
            markers[0].barName = (childData.bar_name);
            markers[0].barAddress = (childData.bar_location); 
            markers[0].barTime = (childData.closingTime);
            markers[0].beerPrice = (childData.drinks_beer);
            markers[0].winePrice = (childData.drinks_wine);
            markers[0].mixDrink = (childData.drinks_mix);
            markers[0].foodPrice = (childData.food_wings);
            displayMarkers();
            console.log(markers[0].barTime,"markers[0].barTime");
         
          }
          if (childData.user_id === "-L_AFq6YwV41N7p_Y18-") {
             //markers[0].iconImage = (childData.activeImage);
            markers[1].barName = (childData.bar_name);
            markers[1].barAddress = (childData.bar_location);
            markers[1].barTime = (childData.closingTime);
            markers[1].beerPrice = (childData.drinks_beer);
            markers[1].winePrice = (childData.drinks_wine);
            markers[1].mixDrink = (childData.drinks_mix);
            markers[1].foodPrice = (childData.food_wings);
            displayMarkers();
          }
          if (childData.user_id === "-L_AFAPfSdyGTDHxxhEC") {
            //markers[0].iconImage = (childData.activeImage);
            markers[2].barName = (childData.bar_name);
            markers[2].barAddress = (childData.bar_location);
            markers[2].barTime = (childData.closingTime);
            markers[2].beerPrice = (childData.drinks_beer);
            markers[2].winePrice = (childData.drinks_wine);
            markers[2].mixDrink = (childData.drinks_mix);
            markers[2].foodPrice = (childData.food_wings);
            displayMarkers();
          }
          if (childData.user_id === "-L_AG3K5wk3yYNob24kc") {
            //markers[0].iconImage = (childData.activeImage);
            markers[3].barName = (childData.bar_name);
            markers[3].barAddress = (childData.bar_location);
            markers[3].barTime = (childData.closingTime);
            markers[3].beerPrice = (childData.drinks_beer);
            markers[3].winePrice = (childData.drinks_wine);
            markers[3].mixDrink = (childData.drinks_mix);
            markers[3].foodPrice = (childData.food_wings);
            displayMarkers();
          }
          if (childData.user_id === "-L_Kg2sF6dFfLVGOCyH2") {
            //markers[4].iconImage = (childData.activeImage);
            markers[4].barName = (childData.bar_name);
            markers[4].barAddress = (childData.bar_location);
            markers[4].barTime = (childData.closingTime);
            markers[4].beerPrice = (childData.drinks_beer);
            markers[4].winePrice = (childData.drinks_wine);
            markers[4].mixDrink = (childData.drinks_mix);
            markers[4].foodPrice = (childData.food_wings);
            displayMarkers();
          }
          
          // cellId.appendChild(document.createTextNode(childKey));
          // cellName1.appendChild(document.createTextNode(childData.bar_name));
          // cellName2.appendChild(document.createTextNode(childData.bar_location));
          // cellName3.appendChild(document.createTextNode(childData.closingTime));
          // cellName4.appendChild(document.createTextNode(childData.drinks_beer));
          // cellName5.appendChild(document.createTextNode(childData.drinks_wine));
          // cellName6.appendChild(document.createTextNode(childData.drinks_mix));
          // cellName7.appendChild(document.createTextNode(childData.food_wings));
          // rowIndex = rowIndex + 1;   
        });
      });
      // Add Marker Function
      function addMarker(props) {
        console.log("props", props);
        var marker = new google.maps.Marker({
          position: props.coords,
          map: map,
          //icon:props.iconImage
        });
        // Check for customicon
        if (props.iconImage) {
          // Set icon image
          marker.setIcon(props.iconImage);
        }
        // Check content
    // databaseRef.on("child_changed", function(){
        if (props.barName) {
          console.log("props.barName", props.barName);
          var infoWindow = new google.maps.InfoWindow({
            content: "<h1>" + props.barName + "</h1>" + "<p>" + props.barAddress + "</p>" + "<p>" + props.barTime + "</p>" + "<p>Beer Price: $" + props.beerPrice + "</p>" + "<p>Wine Price: $" + props.winePrice + "</p>" +  "<p>Mix Drinks Price: $" + props.mixDrink + "</p>" + "<p>Wings Price: $" + props.foodPrice + "</p>"
            });
        
          marker.addListener('click', function () {
            infoWindow.open(map, marker);
          });
        }
    // });
      };
    
    }