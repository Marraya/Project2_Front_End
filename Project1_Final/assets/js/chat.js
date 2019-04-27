  $(".messages").animate({
      scrollTop: $(document).height()
  }, "fast");
  var user_id;

  function newMessage() {

      message = $(".message-input input").val();
      if ($.trim(message) == '') {
          return false;
      }
      writeUserData(message);
  };
  $('.submit').click(function () {
      newMessage();
  });
  $(window).on('keydown', function (e) {
      if (e.which == 13) {
          newMessage();
          return false;
      }
  });

  // Initialize Firebase
  var otherAppConfig = {
      apiKey: "AIzaSyDCkQHaLbNdl-DfBYMxDjdU0pMU0Oqoj0E",
      authDomain: "group-chat-77bee.firebaseapp.com",
      databaseURL: "https://group-chat-77bee.firebaseio.com",
      projectId: "group-chat-77bee",
      storageBucket: "",
      messagingSenderId: "990358253182"
  };
  firebase.initializeApp(otherAppConfig, "other");

  var user = firebase.auth().signInAnonymously();
  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
          // User is signed in.
          var isAnonymous = user.isAnonymous;
          user_id = user.uid;
      } else {
          // User is signed out.
      }
  });

  // get firebase database reference...
  var db_ref = firebase.database().ref('/');
  db_ref.on('child_added', function (data) {
      var type;
      if (data.val().user_id == user_id) {
          type = "sent";
      } else {
          type = "replies";
      }
      $('<li class="' + type + '"><p>' + data.val().message + '</p></li>').appendTo($('.messages ul'));
      $('.message-input input').val(null);
      $('.contact.active .preview').html('<span>You: </span>' + data.val().message);
      $(".messages").animate({
          scrollTop: $(".messages")[0].scrollHeight
      }, 0);
  });

  function writeUserData(message) {
      db_ref.push({
          user_id: user_id,
          message: message
      });
  }