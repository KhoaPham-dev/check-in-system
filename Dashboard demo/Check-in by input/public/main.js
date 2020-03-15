var script_url = "https://script.google.com/macros/s/AKfycbxm3qP3bNHcoyRoifKR0iFdLs-9dVPUBgdpQCu6k8QF0b975wE/exec";
let $submitButton = $("#submit");
var fileId = localStorage['fileId'];
    localStorage.removeItem( 'fileId' ); // Clear the localStorage
  // Make an AJAX call to Google Script
  function update_checkin_value(event){
    event.preventDefault();
    var $id= $("#id").val();
    // Get the variable from localStorage
    console.log(fileId);
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
    displayResponse(res);

  }

$submitButton.on('click', update_checkin_value);