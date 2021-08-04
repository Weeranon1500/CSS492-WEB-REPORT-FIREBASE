//cache elements

//Views
var user_authMainView = document.getElementById('user_authMain');
var user_authRegister = document.getElementById('user_authRegister');
var user_authProfile = document.getElementById('user_authProfile');
var user_authRedir = document.getElementById('user_authRedir');

//Event Handlers
var user_submitAuthBtn = document.getElementById('user_submitAuth');
var user_newRegBtn = document.getElementById('user_newReg');
var user_submitRegBtn = document.getElementById('user_submitReg');
var user_submitProfileBtn = document.getElementById('user_submitProfile');
var user_noProfileSubmit = document.getElementById('user_noUpdateRedir');
var user_editProfileBtn = document.getElementById('user--updateProfile');
var user_viewProfileBtn = document.getElementById('user--viewProfile');

$(user_submitAuthBtn).click(function(){
  authLogin(event);
  $(user_authMainView).addClass('hidden');
  $(user_authRedir).removeClass('hidden');
});

$(user_submitRegBtn).click(function(){
  authRegister(event);
  $(user_authRegister).addClass('hidden');
  $(user_authMainView).removeClass('hidden');
});

$(user_newRegBtn).click(function(){
  $(user_authMainView).addClass('hidden');
  $(user_authRegister).removeClass('hidden');
});
$(user_submitProfileBtn).click(function(){
  updateUserProfile();
  $(user_authProfile).addClass('hidden');
  $(user_authRedir).removeClass('hidden');
});
$(user_noProfileSubmit).click(function(){
  $(user_authProfile).addClass('hidden');
  $(user_authRedir).removeClass('hidden');
});
$(user_editProfileBtn).click(function(){
  $(user_authRedir).addClass('hidden');
  $(user_authProfile).removeClass('hidden');
});
//Submitting Updated Profile
//View Profile -- from Redir view
$(user_viewProfileBtn).click(function(){
  getUserProfile();
});


//FIREBASE STUFF

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCGJU9CzxiIDoid0eWHiFceHBepyJ09QNc",
    authDomain: "mealplanner-ce1f4.firebaseapp.com",
    databaseURL: "https://mealplanner-ce1f4.firebaseio.com",
    storageBucket: "mealplanner-ce1f4.appspot.com",
    messagingSenderId: "952256709715"
  };
  firebase.initializeApp(config);
this.firebaseToken = document.querySelector("#firebase-token");
this.firebaseToken.innerHTML = "Welcome !";

// Login Event
function authLogin(event) {
  event.preventDefault();
  var auth_email = document.getElementById('user--authEmail').value;
  var auth_password = document.getElementById('user--authPassword').value;

  // User Login
  firebase
    .auth()
    .signInWithEmailAndPassword(auth_email, auth_password)
    .then(function () {
      this.firebaseToken.innerHTML = "Sign-in Successful !";
      console.log('sign in successful !');
    userAuthAction();
      // outputFirebaseData();
    })
    .catch(function(err) {
      alert(err.message);
    });
}

//Register User
function authRegister(event) {
  event.preventDefault();
  var registerForm = $("form[name='registerForm']");
  var reg_email = document.getElementById('user--regEmail').value;
  var reg_password = document.getElementById('user--regPassword').value;

  // User Registeration
  firebase
    .auth()
    .createUserWithEmailAndPassword(reg_email, reg_password)
    .then(function () {
      this.firebaseToken.innerHTML = "Registered successfully !";
    })
    .catch(function(err) {
      alert(err.message);
    })
}
//
function outputFirebaseData() {
  this.firebaseToken.innerHTML = "Hello world";
}


function userAuthAction(){
  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('signed in');
    getUserProfile();
    // User is signed in.
  } else {
    console.log('please sign in');
    // No user is signed in.
  }
});
  
}


// User profile
function getUserProfile(){
  var user = firebase.auth().currentUser;
var name, email, photoUrl, uid;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  uid = user.uid; 
  alert(uid + ' ' + name);
}
  
}

// update User Profile
function updateUserProfile(){
  var user = firebase.auth().currentUser;
  var user_updateName = document.getElementById('user--displayName').value;
  var user_updateLocalCity = document.getElementById('user--locationCity').value;
  user.updateProfile({
  displayName: user_updateName,
  photoURL: "https://example.com/jane-q-user/profile.jpg",
    locationCity: user_updateLocalCity
}).then(function() {
  // Update successful.
    console.log('update success');
}, function(error) {
  // An error happened.
    console.log(error);
});
  
}