 

function displayResponse(res){
    console.log(infor);
    if(res.responseStatus){
        // res = JSON.parse(res);
        let infor="Successful!"
        
        $("#information-field").html(`<ul>${infor}</ul>`);
        

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
        $("#information-field").html(`<ul>${infor}</ul>`);
    }
}
const clearPreviousInfor = () => { 
    while(displayInformationField.firstChild){ 
        displayInformationField.removeChild(displayInformationField.firstChild); 
        } 
        
} 