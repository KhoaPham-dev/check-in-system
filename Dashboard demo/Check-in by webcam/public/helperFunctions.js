function displayResponse(res){
    if(res){
        res = JSON.parse(res);
        let infor=
        `Tên:   ${res["Họ và tên"]}<br>
        MSSV:   ${res["MSSV"]}<br>
        SĐT:    ${res["Số điện thoại"]}<br>
        <img src="${res["Avatar"]}">`;
        displayInformationField.innerHTML = `<ul>${infor}</ul>`;
    }
    else {
        console.log("ID incorrect!");
        let infor='Failed!'
        displayInformationField.innerHTML = `<ul>${infor}</ul>`;
    }
}
const clearPreviousInfor = () => { 
    while(displayInformationField.firstChild){ 
        displayInformationField.removeChild(displayInformationField.firstChild); 
        } 
} 