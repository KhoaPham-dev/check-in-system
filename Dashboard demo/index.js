let checkByWebcam = document.getElementById("checkin-webcam");
let checkByInput = document.getElementById("checkin-input");
let urlCheckinInput = "file:///C:/Users/super/OneDrive/Check-in%20System%20Project/Dashboard%20demo/Check-in%20by%20input/index.html";
let urlCheckByWebcam = "file:///C:/Users/super/OneDrive/Check-in%20System%20Project/Dashboard%20demo/Check-in%20by%20webcam/docs/index.html";
let urlLoginPage = "file:///C:/Users/super/OneDrive/Check-in%20System%20Project/Authentication/Login-logout/index.html";
let listUploadedFiles = document.getElementById("list-uploaded-files");
let lengthList = listUploadedFiles.length;
let username = '';
let useremail= '';
let password = '';
const setupUI = async (user) => {
if (user) {
    
    // toggle user UI elements
    let user = firebase.auth().currentUser;

    useremail = user.email;
    if(user != null){
        //show information in dashboard
        var text = '';
        await db.collection(useremail).get().then((querySnapshot) => {
                    username = querySnapshot.docs['0'].data().username;
                    password = querySnapshot.docs['0'].data().password;
                    querySnapshot.forEach((document)=>{
                        documentDB = document.data();
                        text+=`<option value="${documentDB.fileId}">${documentDB.filename}</option>`;
                        
                    })
                    listUploadedFiles.innerHTML = text;
            });
        // await db.collection("users").doc(userID).get().then((doc)=>{
        //     doc.data().wfiles.forEach((file)=>{
        //         listUploadedFiles.innerHTML=`<option value="${file.name}">${file.name}</option>`;
        //     })
        // })

        document.getElementById("user-name").innerHTML = "Welcome User : " + username;
        let logout = document.getElementById("logout");
        
        
    }
        else window.location.href = urlLoginPage;
    } else {
    // redirect to login page
        window.location.href = urlLoginPage;
}
};
firebase.auth().onAuthStateChanged( function(user) {
    setupUI(user);
    $("#submit-button").on("click", function(){
        uploadFile();
    });
});

logout.addEventListener("click", async function(){
    await firebase.auth().signOut();
    window.location.href = urlLoginPage;
})
        //start checkin
        //save to localStorage
        checkByInput.addEventListener('click', function(){
            var fileId = listUploadedFiles.value;
            localStorage.setItem( 'fileId', fileId);
            console.log(fileId);
            window.location.href = urlCheckinInput;
        })
        checkByWebcam.addEventListener('click', function(){
            var fileId = listUploadedFiles.value;
            localStorage.setItem( 'fileId', fileId);
            console.log(fileId);
            window.location.href = urlCheckByWebcam;
        })


//tutorial https://firebase.google.com/docs/firestore/quickstart?authuser=0