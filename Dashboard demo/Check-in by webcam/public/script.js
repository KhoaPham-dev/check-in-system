var script_url = "https://script.google.com/macros/s/AKfycbyKyGDbDmmGYTAVGUqy9ws7JZboZhxYhQy5w2TFU61mr-sLIJQd/exec";
  // Make an AJAX call to Google Script

  function update_checkin_value(id){
    
    var url = script_url+"?callback=ctrlq&id="+id+"&action=updateCheckInValue";
  
    var request = jQuery.ajax({
      crossDomain: true,
      url: url ,
      method: "GET",
      dataType: "jsonp"
    });

  }

  // print the returned data
  function ctrlq(res) {
    let result = 
    `<ul>Tên: ${res.name}<br>
    <img src="${res.avatar}"
    </ul>`;

    $("#information-field").html(result);  
  }