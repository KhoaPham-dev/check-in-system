let loginButton = document.getElementById("login-button");
firebase.auth().onAuthStateChanged(function(user) {
    setupUI(user);
});
  


loginButton.addEventListener("click", login);
  
  
  