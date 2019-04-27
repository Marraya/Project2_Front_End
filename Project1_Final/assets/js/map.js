// var map;
// var latCoord;
// var lngCoord;
// var updateMap;
// // function initMap(){

//     $("#map-search").on("click",function(){
//         event.preventDefault
//         $("#map-container").empty()
        
//         var term =  parseInt($("#term-search").val().trim());
//         var queryURL ='https://maps.googleapis.com/maps/api/geocode/json?address=' + term + '&key=AIzaSyAKa4m_Ooo8qlbVWFjc_5ajgvBiaPFUs9M'

//         $.ajax({
//             url: queryURL,
//             method: "GET"
//           }).then(function(response) {
//             var results = response.results;
//             console.log(results)
//             console.log(results[0].geometry.location.lng);
//             console.log(results[0].geometry.location.lat);
//              lngCoord = results[0].geometry.location.lng;
//              latCoord = results[0].geometry.location.lat;

//              var options = {
//                 zoom:16,
//                 center:{lat:latCoord, lng: lngCoord}
//              }
//              console.log(options)
//              map = new google.maps.Map(document.getElementById('map-container'), options);
//              var image = "http://maps.google.com/mapfiles/ms/icons/bar.png"
//              var coords = {
//               latCoords: [40.763574, 40.763590, 40.762751, 40.763117, 40.764407],
//               lngCoords: [-73.913935, -73.914686, -73.913517, -73.912463, -73.914375],
//               name: ['Smith', 'Wollensky', 'Bernadin', 'Pegasus', 'Guinesses'],
//               sale: [true, false, false, true, false]
//             };

//              for(let i=0; i<coords.latCoords.length; i++){
//                let position = {lat:coords.latCoords[i],lng:coords.lngCoords[i]};
//                let sale = '';
//                if (coords.sale[i] === true ) {
//                  sale = 'HUGE SALE'
//                }
//                let barNum = i+1
//                let infowindow = new google.maps.InfoWindow({
//                 content: '<h2>bar ' + coords.name[i] + "</h2><p>" + "zipcode: 11103</p>" + "<h1>" + sale  + "</h1>"
//               });
            
//                 let marker = new google.maps.Marker({
//                 position: position,
//                 map: map,
//                 title: "barnumber " + barNum,
//                 icon:image
                

//               });
//               marker.addListener('click', function() {
//                 infowindow.open(map, marker);
//               });
//              }

//             });
//           });

var markers = [
    {
      coords: { lat: 40.763574, lng: -73.913935 },
      iconImage: '',
      barName: "",
      barAddress: "",
      barTime:"",
      beerPrice: "",
      winePrice: "",
      mixDrink: "",
      foodPrice: "",
      iconImage2:'',
      user_id:"",

      // content:'<p id="container1">test</p>'
    },
    {
      coords: { lat: 40.763590, lng: -73.914686 },
      iconImage: '',
      barName: "",
      barAddress: "",
      barTime:"",
      beerPrice: "",
      winePrice: "",
      mixDrink: "",
      foodPrice: "",
      iconImage2:'',
      user_id:"",

      // content:'<p id="container1">test</p>'
    },
    {
      coords: { lat: 40.762751, lng: -73.913517 },
      iconImage: '',
      barName: "",
      barAddress: "",
      barTime:"",
      beerPrice: "",
      winePrice: "",
      mixDrink: "",
      foodPrice: "",
      iconImage2:'',
      user_id:"",

      // content:'<p id="container1">test</p>'
    },
    {
      coords: { lat: 40.763117, lng: -73.912463 },
      iconImage: '',
      barName: "",
      barAddress: "",
      barTime:"",
      beerPrice: "",
      winePrice: "",
      mixDrink: "",
      foodPrice: "",
      iconImage2:'',
      user_id:"",

      // content:'<p id="container1">test</p>'
    },
    {
      coords: { lat: 40.764407, lng: -73.914375 },
      iconImage: '',
      barName: "",
      barAddress: "",
      barTime:"",
      beerPrice: "",
      winePrice: "",
      mixDrink: "",
      foodPrice: "",
      iconImage2:'',
      user_id:"",

      // content:'<p id="container1">test</p>'
    },

  ];

  // ********** copy the entire initMap function
  function initMap() {
    
    // Map options
    var options = {
      zoom: 16,
      center: {lat: 40.7641974, lng: -73.9174457}
    }
    var map = new google.maps.Map(document.getElementById('map-container'),options); {
     
      var geocoder = new google.maps.Geocoder();

      document.getElementById('map-search').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
      });
    }
  
    function geocodeAddress(geocoder, resultsMap) {
      var address = document.getElementById('term-search').value;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          resultsMap.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });



    // Add Firebase calls Below

    var tblrestaurant = document.getElementById('tbl_restaurant_info');
    var databaseRef = firebase.database().ref('/restaurants/');
    var rowIndex = 1;
    // listening for event value change
    
    databaseRef.on('value', function(snapshot) {
       snapshot.forEach(function(childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          // if (childData.owner_ID === localStorage.getItem('logged-in-user')) 

          {
              // console.log('only show this restauarnt');
              // console.log(childData)
          
          var row = tblrestaurant.insertRow(rowIndex);
          var cellId = row.insertCell(0);
          // console.log('cellId');
          var cellName1 = row.insertCell(1);
          var cellName2 = row.insertCell(2);
          var cellName3 = row.insertCell(3);
          var cellName4 = row.insertCell(4);
          var cellName5 = row.insertCell(5);
          var cellName6 = row.insertCell(6);
          var cellName7 = row.insertCell(7);
          var cellName8 = row.insertCell(8);
          var cellName9 = row.insertCell(9);
          var cellName10 = row.insertCell(10);
          cellId.appendChild(document.createTextNode(childKey));
          cellName1.appendChild(document.createTextNode(childData.bar_name));
          cellName2.appendChild(document.createTextNode(childData.bar_location));
          cellName3.appendChild(document.createTextNode(childData.startTime));
          cellName4.appendChild(document.createTextNode(childData.endTime));
          cellName5.appendChild(document.createTextNode(childData.drinks_beer));
          cellName6.appendChild(document.createTextNode(childData.drinks_wine));
          cellName7.appendChild(document.createTextNode(childData.drinks_mix));
          cellName8.appendChild(document.createTextNode(childData.food_wings));
          cellName9.appendChild(document.createTextNode(childData.counterValue));
          cellName10.appendChild(document.createTextNode(childData.activeImage));

          rowIndex = rowIndex + 1;   

          }  
          });
      });

      
  //     function update_user(){
  //     var user_id = document.getElementById('user_id').value;
  //     var bar_name = document.getElementById('bar_name').value;
  //     var bar_location = document.getElementById('bar_location').value;
  //     var startTime = document.getElementById('startTime').value;
  //     var endTime = document.getElementById('endTime').value;
  //     var drinks_beer = document.getElementById('drinks_beer').value;
  //     var drinks_wine = document.getElementById('drinks_wine').value;
  //     var drinks_mix = document.getElementById('drinks_mix').value;
  //     var food_wings = document.getElementById('food_wings').value; 
  //     var activeImage = document.getElementById('activeImage').value;    
      
      
  //     // alert('user_id');

  //     var data = {
  //         user_id: user_id,
  //         bar_name: bar_name,
  //         bar_location: bar_location,
  //         startTime: startTime,
  //         endTime: endTime,
  //         drinks_beer: drinks_beer,
  //         drinks_wine: drinks_wine,
  //         drinks_mix: drinks_mix,
  //         food_wings: food_wings,
  //         activeImage: activeImage
  //     }
  //     // var updates = {};
  //     // updates['/restaurants/' + user_id] = data;
  //     firebase.database().ref().child('/restaurants/' + user_id).update(data);

  //     // alert('Updated successfully');

  //     reload_page();
  // }

  function save_user(){
    // var user_id = document.getElementById('user_id').value;
    var bar_name = document.getElementById('bar_name').value;
    var bar_location = document.getElementById('bar_location').value;
    var startTime = document.getElementById('startTime').value;
    var endTime = document.getElementById('endTime').value;
    var drinks_beer = document.getElementById('drinks_beer').value;
    var drinks_wine = document.getElementById('drinks_wine').value;
    var drinks_mix = document.getElementById('drinks_mix').value;
    var food_wings = document.getElementById('food_wings').value;
    var activeImage = document.getElementById('activeImage').value;
    var uid = firebase.database().ref().child('/restaurants/').push().key;
    var data = {
        user_id: uid,
        bar_name: bar_name,
        bar_location: bar_location,
        startTime: startTime,
        endTime: endTime,
        drinks_beer: drinks_beer,
        drinks_wine: drinks_wine,
        drinks_mix: drinks_mix,
        food_wings: food_wings,
        activeImage: activeImage
    }
    var updates = {};
    updates['/restaurants/' + uid] = data;
    firebase.database().ref().update(updates);
    alert('The Restaurant info has been created successfully');
    reload_page();
    
}

$('#user-update').click(function () {
  update_user();
});

$('#user-save').click(function () {
  save_user();
});
$('#user-delete').click(function () {
  delete_user();
});
// 24.20 seconds
function update_user(){
    var user_id = document.getElementById('user_id').value;
    var bar_name = document.getElementById('bar_name').value;
    var bar_location = document.getElementById('bar_location').value;
    var startTime = document.getElementById('startTime').value;
    var endTime = document.getElementById('endTime').value;
    var drinks_beer = document.getElementById('drinks_beer').value;
    var drinks_wine = document.getElementById('drinks_wine').value;
    var drinks_mix = document.getElementById('drinks_mix').value;
    var food_wings = document.getElementById('food_wings').value; 
    var activeImage = document.getElementById('activeImage').value;    
    
    
    // alert('user_id');
    var data = {
        user_id: user_id,
        bar_name: bar_name,
        bar_location: bar_location,
        startTime: startTime,
        endTime: endTime,
        drinks_beer: drinks_beer,
        drinks_wine: drinks_wine,
        drinks_mix: drinks_mix,
        food_wings: food_wings,
        activeImage: activeImage
    }
    // var updates = {};
    // updates['/restaurants/' + user_id] = data;
    firebase.database().ref().child('/restaurants/' + user_id).update(data);
    alert('Updated successfully');
    reload_page();
}
function delete_user(){
    var user_id = document.getElementById('user_id').value;
    var bar_name = document.getElementById('bar_name').value;
    var bar_location = document.getElementById('bar_location').value;
    var startTime = document.getElementById('startTime').value;
    var endTime = document.getElementById('endTime').value;
    var drinks_beer = document.getElementById('drinks_beer').value;
    var drinks_wine = document.getElementById('drinks_wine').value;
    var drinks_mix = document.getElementById('drinks_mix').value;
    var food_wings = document.getElementById('food_wings').value;
    var activeImage = document.getElementById('activeImage').value;
    firebase.database().ref().child('/restaurants/' + user_id).remove();
    alert('The Restaurant Info has been deleted successfully');
    reload_page();
    
}
function reload_page(){
}

      function displayMarkers(){
          for (var i = 0; i < markers.length; i++) {
            // Add marker
          //   console.log(markers)
            addMarker(markers[i]);
          }
      }
      databaseRef.on('value', function (snapshot) {
           snapshot.forEach(function (childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();

        if (childData.user_id === "-L_AF--wreUG4JwFyHBZ") {
          // markers[0].iconImage = (childData.activeImage);
          markers[0].user_id = (childData.user_id);
          markers[0].barName = (childData.bar_name);
          markers[0].barAddress = (childData.bar_location); 
          // ******** 
          markers[0].barTime = ("<p><b>From:</b>" + childData.startTime + "pm" + " <b>To:</b>" + childData.endTime + "pm" + "</p>");
          // ******** 
          markers[0].beerPrice = (childData.drinks_beer);
          markers[0].winePrice = (childData.drinks_wine);
          markers[0].mixDrink = (childData.drinks_mix);
          markers[0].foodPrice = (childData.food_wings);
          markers[0].iconImage = (childData.inactiveImage);
      
          displayMarkers();
          // console.log(markers[0].barTime,"markers[0].barTime");
       
        }
        if (childData.user_id === "-L_AFq6YwV41N7p_Y18-") {
           //markers[0].iconImage = (childData.activeImage);
          // markers[1].user_id = (childData.user_id);
          markers[1].barName = (childData.bar_name);
          markers[1].barAddress = (childData.bar_location);
          // ******** 
          markers[1].barTime = ("<p><b>From:</b>" + childData.startTime + "pm" + " <b>To:</b>" + childData.endTime + "pm" + "</p>");
          // ******** 
          markers[1].beerPrice = (childData.drinks_beer);
          markers[1].winePrice = (childData.drinks_wine);
          markers[1].mixDrink = (childData.drinks_mix);
          markers[1].foodPrice = (childData.food_wings);
          markers[1].iconImage = (childData.inactiveImage);
          displayMarkers();
        }
        if (childData.user_id === "-L_AFAPfSdyGTDHxxhEC") {
          //markers[0].iconImage = (childData.activeImage);
          // markers[2].user_id = (childData.user_id);
          markers[2].barName = (childData.bar_name);
          markers[2].barAddress = (childData.bar_location);
          // ******** 
          markers[2].barTime = ("<p><b>From:</b>" + childData.startTime + "pm" + " <b>To:</b>" + childData.endTime + "pm" + "</p>");
          // ******** 
          markers[2].beerPrice = (childData.drinks_beer);
          markers[2].winePrice = (childData.drinks_wine);
          markers[2].mixDrink = (childData.drinks_mix);
          markers[2].foodPrice = (childData.food_wings);
          markers[2].iconImage = (childData.inactiveImage);
          displayMarkers();
        }
        if (childData.user_id === "-L_AG3K5wk3yYNob24kc") {
          //markers[0].iconImage = (childData.activeImage);
          // markers[3].user_id = (childData.user_id);
          markers[3].barName = (childData.bar_name);
          markers[3].barAddress = (childData.bar_location);
          // ******** 
          markers[3].barTime = ("<p><b>From:</b>" + childData.startTime + "pm" + " <b>To:</b>" + childData.endTime + "pm" + "</p>");
          // ******** 
          markers[3].beerPrice = (childData.drinks_beer);
          markers[3].winePrice = (childData.drinks_wine);
          markers[3].mixDrink = (childData.drinks_mix);
          markers[3].foodPrice = (childData.food_wings);
          markers[3].iconImage = (childData.inactiveImage);
          displayMarkers();
        }

        // ******** pulls the counter value from the database and changes the marker image when counter reaches 5 clicks
        if (childData.user_id === "-L_Kg2sF6dFfLVGOCyH2") {
          //this container holds the value of the number of "hot" clicks
          var counterValue = (childData.counterValue);
          console.log(counterValue,"counterValue");
          markers[4].barName = (childData.bar_name);
          markers[4].barAddress = (childData.bar_location);
          markers[4].barTime = ("<p><b>From:</b>" + childData.startTime + "pm" + " <b>To:</b>" + childData.endTime + "pm" + "</p>");
          markers[4].beerPrice = (childData.drinks_beer);
          markers[4].winePrice = (childData.drinks_wine);
          markers[4].mixDrink = (childData.drinks_mix);
          markers[4].foodPrice = (childData.food_wings);
          markers[4].iconImage = (childData.inactive);
          displayMarkers();
        }
        
      });
      
    });
    // Add Marker Function

    function addMarker(props) {
      // console.log("props", props);
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
        // console.log("props.barName", props.barName);
        
        var infoWindow = new google.maps.InfoWindow({
          content: "<h4>" + props.barName + "</h4>" + "<p>" + props.barAddress + "</p>" + "<p>" + props.barTime + "</p>" + "<p><b>Beer Price:</b> $" + props.beerPrice + "</p>" + "<p><b>Wine Price:</b> $" + props.winePrice + "</p>" +  "<p><b>Mix Drinks Price:</b> $" + props.mixDrink + "</p>" + "<p><b>Wings Price:</b> $" + props.foodPrice + "<p>" + '<button id="clicks" onclick="hello()">Hot Bar</button>' + "</p>"
          });
          
        marker.addListener('click', function () {
          infoWindow.open(map, marker);
        });
      }
  // });
    };
  
  }
          
}         // ******** stores the value of the number of clicks
          var clicks = 0;
            function hello() {
            clicks += 1;
          //   document.getElementById("clicks").innerHTML = clicks;
          var user_id = "-L_Kg2sF6dFfLVGOCyH2";
          var counterValue = document.getElementById('clicks').value; 
          var data = {
          counterValue: clicks,
          user_id: user_id,
          }
            firebase.database().ref().child('/restaurants/' + user_id).update(data); // pushes the counter value to database 
          };
          //update this value
          var counterValue = 0;
          // ********