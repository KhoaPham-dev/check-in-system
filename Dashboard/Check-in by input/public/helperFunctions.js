
function displayResponse(res){
    if(res.responseStatus){
        let values = res.values;
        let infor=`
        Tên: ${values[0][0]}<br>
        Đơn vị:  ${values[0][1]}<br>
        Chức vụ: ${values[0][5]}
        `
        
        $("#show-result").html(`<ul>${infor}</ul>`);


        //Save to localStorage
        // let data = {
        //     'sumAttended': res['sum'],
        //     'lastRow':res['lr']
        // }
        // localStorage.setItem('data', JSON.stringify(data));
        // console.log(localStorage.getItem('data'));
        
    }
    else {
        console.log("ID incorrect!");
        let infor='ID incorrect!'
        $("#show-result").html(`<ul>${infor}</ul>`);
    }
}
const clearPreviousInfor = () => { 
    while(document.getElementById("show-result").firstChild){ 
        document.getElementById("show-result").removeChild(document.getElementById("show-result").firstChild); 
        } 
        
} 