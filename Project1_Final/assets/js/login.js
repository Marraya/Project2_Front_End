var config = {
  apiKey: "AIzaSyDc09T-OmJie6bBbWkx0FWsPT9Mk10ROp0",
  authDomain: "happy-hour-proje-1551302378847.firebaseapp.com",
  databaseURL: "https://happy-hour-proje-1551302378847.firebaseio.com",
  projectId: "happy-hour-proje-1551302378847",
  storageBucket: "happy-hour-proje-1551302378847.appspot.com",
  messagingSenderId: "650709499185"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) { // if user is logged in we show the login_div
    document.getElementById("user_div").style.display = "block";
    // document.getElementById("login_div").style.display = "none";
    $('#login_div').hide();

    var user = firebase.auth().currentUser;
    if (user != null) {
      var email_id = user.email;
      document.getElementById("user_param").innerHTML("Current User: " + email_id);
      $('#log-out').show();
    }

  } else { // if user is not login we show the user_div
    // document.getElementById("user_div").style.display = "none";
    $('#user_div').hide(); // This does the same as above
    $('#log-out').hide();
    document.getElementById("login_div").style.display = "block";
    // $('#login_div').show(); **Gian you can use this too**
  }
});


function login() {

  var userEmail = document.getElementById("input-email").value;
  var userPass = document.getElementById("input-password").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    // window.alert("Error :" + errorMessage);
    $('#server-error').text(errorMessage);
  });
}

function logout() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
}

/////////////////////////

// var config = {
//   apiKey: "AIzaSyDc09T-OmJie6bBbWkx0FWsPT9Mk10ROp0",
//   authDomain: "happy-hour-proje-1551302378847.firebaseapp.com",
//   databaseURL: "https://happy-hour-proje-1551302378847.firebaseio.com",
//   projectId: "happy-hour-proje-1551302378847",
//   storageBucket: "happy-hour-proje-1551302378847.appspot.com",
//   messagingSenderId: "650709499185"
// };
// firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) { // if user is logged in we show the login_div
    document.getElementById("user_div").style.display = "block";
    // document.getElementById("login_div").style.display = "none";
    $('#login_div').hide();

    var user = firebase.auth().currentUser;
    if (user != null) {
      var email_id = user.email;
      document.getElementById("user_param").innerHTML = "Current User: " + email_id;
      $('#log-out').show();
    }

  } else { // if user is not login we show the user_div
    // document.getElementById("user_div").style.display = "none";
    $('#user_div').hide(); // This does the same as above
    $('#log-out').hide();
    document.getElementById("login_div").style.display = "block";
    // $('#login_div').show(); *Gian you can use this too*
  }
});

var databaseRef = firebase.database().ref('/restaurants/');
var rowIndex = 1;
// ref.child("L_AEn6JgjVBBHicdpSY").on('value', gotUserData);

// function gotUserData(snapshot){
//   snapshot.forEach(userSnapshot => {
//     var k = userSnapshot.key;
//     var id = userSnapshot.val().AssignedID;
//     var name = userSnapshot.val().Name;

//   })
// }

databaseRef.on("value", function (childSnapshot) {

  console.log(childSnapshot.val());

  var barData = childSnapshot.val();

  console.log(barData)

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

///////////////////////

firebase.database().ref('/restaurants/').child('-L_AF--wreUG4JwFyHBZ').once('value').then(function (snap) {
  const user = snap.val()
  const userKey = snap.key
  console.log(user);
  console.log(userKey);
  console.log(user.inactiveImage)
  console.log(user.activeImage)

  console.log(user.testStatus)

  // user.update(data);


})

// var switchStatus = "false";
// $("#customSwitch1").on('change', function () {
//   if ($(this).is(':checked')) {
//     switchStatus = "true";
//     alert(switchStatus); // To verify
//     updateHotBar()
//     console.log(user.testStatus)


//   } else {
//     switchStatus = "false";
//     alert(switchStatus); // To verify
//     updateHotBar()
//     console.log(user.testStatus)
//   }
// });

function update_user() {
  var toggleState = $('#customSwitch1').value;
  //var user_id = "-L_AF--wreUG4JwFyHBZ"
  // alert('user_id');
  var data = {
    testStatus: toggleState
  }
  // update(data);
  // var updates = {};
  // updates['/restaurants/' + user_id] = data;
  firebase.database().ref().child('-L_AF--wreUG4JwFyHBZ').update(data);
  alert('Updated successfully');
  reload_page();
}

////// Mario Bar Hot Switch
$('#customSwitch1_ON').click(function () {
  var user_id = "-L_AF--wreUG4JwFyHBZ"
  var fireImage = "https://i.ibb.co/7CfSkGH/fire-bar.gif"
  var data = {
    user_id: user_id,
    inactiveImage: fireImage
  }
  firebase.database().ref().child('/restaurants/' + user_id).update(data);

  firebase.database().ref('/restaurants/').child('-L_AF--wreUG4JwFyHBZ').once('value').then(function (snap) {
    const user = snap.val()
    console.log("Mario Bar: " + user.inactiveImage);
  });

});

$('#customSwitch1_OFF').click(function () {
  var user_id = "-L_AF--wreUG4JwFyHBZ"
  var coldImage = "https://i.ibb.co/z4KMW8K/cold-bar.png"
  var data = {
    user_id: user_id,
    inactiveImage: coldImage
  }
  firebase.database().ref().child('/restaurants/' + user_id).update(data);

  firebase.database().ref('/restaurants/').child('-L_AF--wreUG4JwFyHBZ').once('value').then(function (snap) {
    const user = snap.val()
    console.log("Mario Bar: " + user.inactiveImage);
  });

});

////// Rita Bar Hot Switch

$('#customSwitch2_ON').click(function () {
  var user_id = "-L_AFAPfSdyGTDHxxhEC"
  var fireImage = "https://i.ibb.co/7CfSkGH/fire-bar.gif"
  var data = {
    user_id: user_id,
    inactiveImage: fireImage
  }
  firebase.database().ref().child('/restaurants/' + user_id).update(data);

  firebase.database().ref('/restaurants/').child('-L_AFAPfSdyGTDHxxhEC').once('value').then(function (snap) {
    const user = snap.val()
    console.log("Rita Bar: " + user.inactiveImage);
  });

});

$('#customSwitch2_OFF').click(function () {
  var user_id = "-L_AFAPfSdyGTDHxxhEC"
  var coldImage = "https://i.ibb.co/z4KMW8K/cold-bar.png"
  var data = {
    user_id: user_id,
    inactiveImage: coldImage
  }
  firebase.database().ref().child('/restaurants/' + user_id).update(data);

  firebase.database().ref('/restaurants/').child('-L_AFAPfSdyGTDHxxhEC').once('value').then(function (snap) {
    const user = snap.val()
    console.log("Rita Bar: " + user.inactiveImage);
  });

});

///// Justin Bar Hot Switch

$('#customSwitch3_ON').click(function () {
  var user_id = "-L_AFq6YwV41N7p_Y18-"
  var fireImage = "https://i.ibb.co/7CfSkGH/fire-bar.gif"
  var data = {
    user_id: user_id,
    inactiveImage: fireImage
  }
  firebase.database().ref().child('/restaurants/' + user_id).update(data);

  firebase.database().ref('/restaurants/').child('-L_AFq6YwV41N7p_Y18-').once('value').then(function (snap) {
    const user = snap.val()
    console.log("Justin Bar: " + user.inactiveImage);
  });

});

$('#customSwitch3_OFF').click(function () {
  var user_id = "-L_AFq6YwV41N7p_Y18-"
  var coldImage = "https://i.ibb.co/z4KMW8K/cold-bar.png"
  var data = {
    user_id: user_id,
    inactiveImage: coldImage
  }
  firebase.database().ref().child('/restaurants/' + user_id).update(data);

  firebase.database().ref('/restaurants/').child('-L_AFq6YwV41N7p_Y18-').once('value').then(function (snap) {
    const user = snap.val()
    console.log("Justin Bar: " + user.inactiveImage);
  });

});

///// Carden Bar Hot Switch

$('#customSwitch4_ON').click(function () {
  var user_id = "-L_AG3K5wk3yYNob24kc"
  var fireImage = "https://i.ibb.co/7CfSkGH/fire-bar.gif"
  var data = {
    user_id: user_id,
    inactiveImage: fireImage
  }
  firebase.database().ref().child('/restaurants/' + user_id).update(data);

  firebase.database().ref('/restaurants/').child('-L_AG3K5wk3yYNob24kc').once('value').then(function (snap) {
    const user = snap.val()
    console.log("Carden Bar: " + user.inactiveImage);
  });

});

$('#customSwitch4_OFF').click(function () {
  var user_id = "-L_AG3K5wk3yYNob24kc"
  var coldImage = "https://i.ibb.co/z4KMW8K/cold-bar.png"
  var data = {
    user_id: user_id,
    inactiveImage: coldImage
  }
  firebase.database().ref().child('/restaurants/' + user_id).update(data);

  firebase.database().ref('/restaurants/').child('-L_AG3K5wk3yYNob24kc').once('value').then(function (snap) {
    const user = snap.val()
    console.log("Carden Bar: " + user.inactiveImage);
  });

});

///// Gian Bar Hot Switch

$('#customSwitch5_ON').click(function () {
  var user_id = "-L_Kg2sF6dFfLVGOCyH2"
  var fireImage = "https://i.ibb.co/7CfSkGH/fire-bar.gif"
  var data = {
    user_id: user_id,
    inactive: fireImage
  }
  firebase.database().ref().child('/restaurants/' + user_id).update(data);

  firebase.database().ref('/restaurants/').child('-L_Kg2sF6dFfLVGOCyH2').once('value').then(function (snap) {
    const user = snap.val()
    console.log("Gian Bar: " + user.inactive);
  });

});

$('#customSwitch5_OFF').click(function () {
  var user_id = "-L_Kg2sF6dFfLVGOCyH2"
  var coldImage = "https://i.ibb.co/z4KMW8K/cold-bar.png"
  var data = {
    user_id: user_id,
    inactive: coldImage
  }
  firebase.database().ref().child('/restaurants/' + user_id).update(data);

  firebase.database().ref('/restaurants/').child('-L_Kg2sF6dFfLVGOCyH2').once('value').then(function (snap) {
    const user = snap.val()
    console.log("Gian Bar: " + user.inactive);
  });

});

function updateHotBar() {
  var user_id = "-L_AF--wreUG4JwFyHBZ"
  var toggleState = $('#customSwitch1').value;
  var data = {
    user_id: user_id,
    testStatus: switchStatus
  }
  firebase.database().ref().child('/restaurants/' + user_id).update(data);
}



$.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10&callback=", function (a) {

    
    
  $("#quotes_here").append(a[0].content + "<p>— " + a[0].title + "</p>"); 

    
});