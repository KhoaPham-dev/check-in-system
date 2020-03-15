var script_url = "https://script.google.com/macros/s/AKfycbxm3qP3bNHcoyRoifKR0iFdLs-9dVPUBgdpQCu6k8QF0b975wE/exec";
let $submitButton = $("#submit");
var fileId = sessionStorage.getItem('fileId');
var startSendReq = true;
let form = document.getElementById("form");
   //Chức năng lưu vào sessionStorage khi offline rồi tự động cập nhật khi online
   //Chức năng xử lí khi gặp sự cố browser tắt đột ngột thì vẫn lưu lại dữ liệu và thực hiện tiếp việc checkin
  // Make an AJAX call to Google Script
  function handleInput(event){
    event.preventDefault();
    
    var $id= $("#id").val();
    //Append to array in sessionStorage
    if($id)
    appendToStorage($id);
    form.reset();
    //console.log(sessionStorage.getItem(`array_${fileId}`));
    //console.log(fileId);
  }

  //Append to existed sessionStorage
  function appendToStorage($id){
    var array = sessionStorage.getItem(`array_${fileId}`);
    if(!array){
      var arr = [];
      sessionStorage.setItem(`array_${fileId}`, JSON.stringify(arr));
      array = sessionStorage.getItem(`array_${fileId}`);
    }
    // else if(typeof JSON.parse(sessionStorage.getItem(`array_${fileId}`))!= "object"){
    //   var array = sessionStorage.getItem(`array_${fileId}`);
    //   array = `[${sessionStorage.getItem(`array_${fileId}`)}]`;
    //   sessionStorage.setItem(`array_${fileId}`, array);
    // }
    array =  JSON.parse(array);
    array.push($id);
    sessionStorage.setItem(`array_${fileId}`, JSON.stringify(array));
  }

  function sendRequest($id){
    var url = script_url+"?callback=ctrlq&id="+$id+"&fileId="+fileId+"&action=updateCheckInValue";
  
    var request = jQuery.ajax({
      crossDomain: true,
      url: url ,
      method: "GET",
      dataType: "jsonp"
    });
  }
  
  // print the returned data
  function ctrlq(res) {
    var index = '';
    //console.log(res);
     displayResponse(res);
     
    //console.log(res);
    //clear storage
      var array =  sessionStorage.getItem(`array_${fileId}`);
      array =  JSON.parse(array);
      console.log(array);
      index = array.indexOf(res.id);
      //console.log(res.id);
      //console.log(index);
       array.splice(index, 1);
      
       sessionStorage.setItem(`array_${fileId}`, JSON.stringify(array));
       startSendReq = true; //cho phép send request
  }

//Implementing
$submitButton.on('click', handleInput);

var count = 1; //trạng thái mặc định
//Start to update checkin
setInterval( function(){

  if(navigator.onLine){
    //khi có mạng trở lại, mở startSendReq = true để send request
    if(count == 2){
      startSendReq = true;
      count = 1; // trả về mode mặc định
    }
    //Khi count = 1 về chế độ bình thường (không tác động vào startSendReq)
    //count == 1 trở về default status
  }
  else{
    //mất kết nối, hệ thống ko send được request, lưu dữ liệu checkin vào session
    count = 2;
  }
  
  if(JSON.parse(sessionStorage.getItem(`array_${fileId}`))){
  try{
      if(startSendReq == true && JSON.parse(sessionStorage.getItem(`array_${fileId}`))[0]){
        startSendReq = false; //Ngừng send request nếu hàm setInterval lặp lại
       sendRequest(JSON.parse(sessionStorage.getItem(`array_${fileId}`))[0]);
    }
    }catch(err){
      //console.log(err);
  }
}
}, 50);