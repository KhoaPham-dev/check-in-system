// signup
const dashboard_url = "file:///C:/Users/super/OneDrive/Check-in%20System%20Project/Dashboard%20demo/index.html";
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['email_field'].value;
  const password = signupForm['password_field'].value;
  const username = signupForm['username_field'].value;
  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(async cred => {
    //add user's imformation to firestore
    try{
      await db.collection(email).doc('init').set({
        username: username,
        email: email,
        password: password,
        filename: '',
        fileId: ''
      })
    }catch(error){
      console.error("Error adding document: ", error);
    };
    
    
    // redirect to user's dashboard
     window.location.href = dashboard_url;
  }).catch(err=>{
    alert(err.message);
  });
});

