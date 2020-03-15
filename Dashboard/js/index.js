const checkByWebcam = document.getElementById("checkin-webcam");
const checkByInput = document.getElementById("checkin-input");
const urlLoginPage = "../Authentication/Login-logout/index.html";
const listUploadedFilesCheckin = document.getElementById("list-uploaded-files-checkin");
const listUploadedFilesDashboard = document.getElementById("list-uploaded-files-dashboard");
const logout = document.getElementById("log-out");
const script_getSSdata_url = "https://script.google.com/macros/s/AKfycbwGiMIpKfHLWSeHoQLQ4dAU8l8-vDW8hehdTdIZ_Yg7D_9cJtk/exec";
var username = '';
var useremail= '';
var password = '';
var card;
var cards={};

firebase.auth().onAuthStateChanged(async function(user) {
    //để hàm trong đây nếu muốn chúng chỉ được phép thực thi sau khi đã nhận thông tin user
    await setupUI(user);
    // if(sessionStorage.getItem(listUploadedFilesDashboard.value))
    //     document.getElementById("container-cards").innerHTML = JSON.parse(sessionStorage.getItem(listUploadedFilesDashboard.value))["table"];
    $("#submit-button").on("click", function(e){
        setTimeout(function(){
            window.location.href = urlDashboardPage;
          }, 5000);
      uploadFile();
      
    });
    //For toggle ss
    //listUploadedFilesDashboard.addEventListener("change", function(){
        //toggleStatus = 1;
    //})
    
    var str = listUploadedFilesCheckin.value;
    var index = str.indexOf(',');
    var fileId = str.substring(0, index);
    sessionStorage.setItem( 'fileId', fileId);
});
document.getElementById("get-ss").addEventListener("click", function(){
    getSS();
})
function getSS(){
    var str = listUploadedFilesDashboard.value;
    var index = str.indexOf(',');
    var fileId = str.substring(0, index);
    var filename = str.substring(index+1);
    getSSData(fileId, filename);
};

const setupUI = async (user) => {
    if (user) {
        
        // toggle user UI elements
        let user = firebase.auth().currentUser;

        useremail = user.email;
        if(user != null){
            //show information in dashboard
            var text = "";
            await db.collection(useremail).get().then((querySnapshot) => {
                        username = querySnapshot.docs['0'].data().username;
                        password = querySnapshot.docs['0'].data().password;
                        querySnapshot.forEach((document)=>{
                            documentDB = document.data();
                            text+=`<option value="${documentDB.fileId},${documentDB.filename}">${documentDB.filename}</option>`;
                            cards[documentDB.filename]="";
                        });
                        listUploadedFilesDashboard.innerHTML = text;
                        listUploadedFilesCheckin.innerHTML = text;

                });
            document.getElementById("user-name").innerHTML = username;
            
            
        }
        else window.location.href = urlLoginPage;
    }
    else {
    // redirect to login page
    window.location.href = urlLoginPage;
    }
};
/* -----------------------------------------------------------------------------------------*/
//LOG OUT
logout.addEventListener("click", async function(){
    await firebase.auth().signOut();
    window.location.href = urlLoginPage;
})

/* -----------------------------------------------------------------------------------------*/
//Get spreadsheet data
//send request
function getSSData(fileId, filename){
    if(!fileId || !filename) return;
    var url = script_getSSdata_url+"?callback=ctrlq_ss&fileId="+fileId+"&filename="+filename;
                        
    var request = jQuery.ajax({
    crossDomain: true,
    url: url ,
    method: "GET",
    dataType: "jsonp"
    });
}
//Get response ss data
function ctrlq_ss(res) {
    //sessionStorage.setItem(res.fileId,res.data);
       var str = listUploadedFilesDashboard.value;
        var index = str.indexOf(',');
        var filenameCurrent = str.substring(index+1);

    if(cards[res.filename] && filenameCurrent == res.filename){
        card = cards[res.filename]
        var ss = card["allData"];
        var lastRowss = ss[ss.length-1];
        var numAttended = lastRowss[lastRowss.length-1];
        if(numAttended != JSON.parse(res.data)[res.lr-1][res.lc-1]){
            var dataId_Status = {};
            var resData = JSON.parse(res.data);
            subtract = resData[res.lr-1][res.lc-1] -  numAttended ;
            var i = 0;
            var statusCol = res.lc - 1;
            var idCol = res.lc - 2;
            //tiến hành update dữ liệu vào cột
            while(subtract > 0){
                if(resData[i][statusCol]!==ss[i][statusCol]){
                    document.getElementById(`${ss[i][idCol]}`).lastChild.innerText = resData[i][statusCol];
                    dataId_Status[`${ss[i][idCol]}`] = resData[i][statusCol]; //status 0 -> 1
                    subtract--;
                }
                i++;

            }
            var statistic = {
                'sumAttended': resData[res.lr-1][res.lc-1], //dòng cuối cùng của cột cuối cùng =))
                'lastRow': res.lr-2
                }
            renderCheckedRow(dataId_Status);
            loadChart(statistic);
        }
    }
    else if(!cards[res.filename] || filenameCurrent != res.filename ){
        cards[res.filename] = collectSSData(res.data, res.fileId, res.filename);
            card = cards[res.filename];
        
            document.getElementById("container-cards").innerHTML = card["table"];
            renderCheckedRow(card.dataId_Status);
            loadChart(card.statistic);
                    toggleStatus = 0;
    }
    //sessionStorage.setItem(res.fileId, JSON.stringify(card));
    //first load ss data
    // if(sessionStorage.getItem(listUploadedFilesDashboard.value))
    //     document.getElementById("container-cards").innerHTML = JSON.parse(sessionStorage.getItem(listUploadedFilesDashboard.value))["table"];
}
function collectSSData(data, fileId, filename){
    //var data = JSON.parse(sessionStorage.getItem(fileId));
    data = JSON.parse(data);
    var dataId_Status = {};
    var thead="";
    var tr_s="";
    for(var i = 0; i < data.length-1; i++){
        var tr="";
        
        if(i === 0){
            for(var j = 0; j < data[i].length; j++){
                tr+= `<th>${data[i][j]}</th>`
            }
            thead = `<thead class='table-head'><tr>${tr}</tr></thead>`;
            tr="";
        }
        else{
            for(var j = 0; j < data[i].length; j++){
                tr+= `<td>${data[i][j]}</td>`;
            }
            tr_s+=`<tr id='${data[i][data[i].length-2]}'> ${tr}</tr>`;
            dataId_Status[`${data[i][data[i].length-2]}`] = data[i][data[i].length-1];
        }
        
    }
    var statistic = {
    'sumAttended': data[data.length-1][data[data.length-1].length-1], //dòng cuối cùng của cột cuối cùng =))
    'lastRow': data.length-2
    }
    var tbody = `<tbody class='table-body'>${tr_s}</tbody>`
    var table = 
    `<h2 class='table-title'>${filename}</h2>
    <table class='table'>
            ${thead}
            ${tbody}
    </table>`;
    return {
        "table": `<div id='${filename}' class='card'><div id='ss-data' class='card-body'>${table}</div>`,
        "dataId_Status": dataId_Status,
        "statistic" : statistic,
        "allData": data
    };
}

//render specific updated data
function renderCheckedRow(dataId_Status){
        //var dataId_Status = JSON.parse(sessionStorage.getItem(listUploadedFilesDashboard.value))["dataId_Status"];
        var keys = Object.keys(dataId_Status);
        for(var i = 0; i<keys.length; i++){
            if(dataId_Status[keys[i]] == 1){
                document.getElementById(`${keys[i]}`).classList.add("active-checked-in");
            }
        }
}
       
/* -----------------------------------------------------------------------------------------*/
//start checkin
//save to localStorage
listUploadedFilesCheckin.addEventListener('change', function(){
    var str = listUploadedFilesCheckin.value;
    var index = str.indexOf(',');
    var fileId = str.substring(0, index);
    sessionStorage.setItem( 'fileId', fileId);
    console.log(fileId);
})


/* -----------------------------------------------------------------------------------------*/
//Toggle navbar
let dashboardNavbar =  document.getElementById("dashboard");
let startCheckinNavbar = document.getElementById("start-checkin");
let contentDashboardRow1 = document.getElementById("content-dashboard-row1");
let contentDashboardRow2 = document.getElementById("content-dashboard-row2");
let contentStartCheckin = document.getElementById("content-start-checkin");
let iframeStartCheckin = document.getElementById("iframe-start-checkin");
function displayDashboardNav(){
    startCheckinNavbar.classList.remove("active");
    dashboardNavbar.classList.add("active");

    contentDashboardRow1.style.display = "block";
    contentDashboardRow2.style.display = "block";
    contentDashboardRow1.classList.add("fade-in");
    contentDashboardRow2.classList.add("fade-in");

    iframeStartCheckin.style.display= "none";
    iframeStartCheckin.classList.remove("fade-in");
    contentStartCheckin.style.display = "none";
    contentStartCheckin.classList.remove("fade-in");
}

function displayStartCheckinNav(){
    dashboardNavbar.classList.remove("active");
    startCheckinNavbar.classList.add("active");

    contentStartCheckin.style.display = "block";
    contentStartCheckin.classList.add("fade-in");
    iframeStartCheckin.classList.add("fade-in");
    iframeStartCheckin.style.display = "block";

    contentDashboardRow1.style.display = "none";    
    contentDashboardRow2.style.display = "none"; 
    contentDashboardRow1.classList.remove("fade-in");
    contentDashboardRow2.classList.remove("fade-in");
    
}

dashboardNavbar.addEventListener('click', displayDashboardNav);
startCheckinNavbar.addEventListener('click', displayStartCheckinNav);

/* -----------------------------------------------------------------------------------------*/
//tutorial https://firebase.google.com/docs/firestore/quickstart?authuser=0

//Generate a random ID
function GenerateRandomId(){
    let max = 99;
    let min = 10;
    return `${Date.now()}${Math.floor(Math.random()*(max-min)+min)}`;
}
function addQrcodeIdStatusCol(){
    var script_url = "https://script.google.com/macros/s/AKfycby3wbmUEY8VeTxZVuwQFKbYT3OChnw_YelZJOWSoANCrUo0Tfk/exec";
    var str = listUploadedFilesDashboard.value;
        var index = str.indexOf(',');
        var fileId = str.substring(0, index);
        var filename = str.substring(index+1);

    
    console.log(fileId)
    let ranId = GenerateRandomId();
  // Make an AJAX call to Google Script


    let url = script_url+"?callback=ctrlq&ranId="+ranId+"&fileId="+fileId;
  
    let request = jQuery.ajax({
      crossDomain: true,
      url: url ,
      method: "GET",
      dataType: "jsonp"
    });
}

//Send mail
function sendEmail(event){
    event.preventDefault();
    if(listUploadedFilesDashboard.value == '' || listUploadedFilesDashboard == undefined){
        alert("File excel isn't chosen");
    }
    else addQrcodeIdStatusCol();
    // print the returned data
}
function ctrlq(res) {
    if(res.responseStatus){
    $('#show-result').html("sent!");
    }
    else $('#show-result').html("Email have already sent");
    alert("sent");
    window.location.href="file:///C:/Users/super/OneDrive/Check-in%20System%20Project/Dashboard/index.html";
  }
$("#send-email").on('click', sendEmail);