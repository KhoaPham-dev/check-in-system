//tutorial https://www.youtube.com/watch?v=_H6jRmcSrJo
//Khi up, vừa đưa dữ liệu lên app script để upload drive, vừa đưa dữ liệu vào firestore để đánh dấu file đó
//Eventlisten this function on index.js file
var urlDashboardPage = "file:///C:/Users/super/OneDrive/Check-in%20System%20Project/Dashboard/index.html"
function uploadFile(){
    var reader = new FileReader();
    var file = document.getElementById("attach").files[0];

    reader.onload = async function (){
        document.getElementById('numOfFiles').value = listUploadedFilesDashboard.length;
        console.log(listUploadedFilesDashboard.length);
        document.getElementById('fileContent').value = reader.result;
        document.getElementById('filename').value = file.name;
        document.getElementById('useremail').value = useremail;
        document.getElementById('username').value = username;
        document.getElementById('password').value = password;
        document.getElementById("uploadForm").submit();
        
        //update thong tin lên DB
        //ĐỂ GG SCRIPT LO!
        // await db.collection("users").doc(userID).get().then((doc)=>{
        //     for (i in doc.files){
        //         if(i === file.name){
        //             checkFileIfExisted = 1;
        //             break;
        //         }
        //     }
        // })
        //     if(!checkFileIfExisted){
        //     await db.collection("users").doc(userID).set({
        //         files:[{
        //             name: file.name,
        //             id: ''
        //         }]
        //     }, {merge: true})
        //     .then(function() {
        //         console.log("Document successfully updated!");
        //     })
        //     .catch(function(error) {
        //         // The document probably doesn't exist.
        //         console.error("Error updating document: ", error);
        //     });
            // console.log(file.name);
            // console.log(username);
            // console.log(userID);
            //window.location.href = '/';
            
        // }else{
        //     alert("File existed!");
        // }
       
    }
    try{
        reader.readAsDataURL(file);
    }catch(err){
        alert("Please choose a file to upload!");
    }
    
}

