function displayResponse(res){
    if(res){
        // res = JSON.parse(res);
        let infor=
        `Tên:   ${res["name"]}<br>
        <img src="${res["avatar"]}">`;
        $("#show-result").html(`<ul>${infor}</ul>`);
    }
    else {
        console.log("ID incorrect!");
        let infor='Failed!'
        $("#show-result").html(`<ul>${infor}</ul>`);
    }
}
const clearPreviousInfor = () => { 
    while(document.getElementById("show-result").firstChild){ 
        document.getElementById("show-result").removeChild(document.getElementById("show-result").firstChild); 
        } 
} 