const setupUI = (user) => {
  if (user != null) {
        window.location.href = "file:///C:/Users/super/OneDrive/Check-in%20System%20Project/Dashboard%20demo/index.html";
      }
};
function login(event){
  event.preventDefault();
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

  });
}
