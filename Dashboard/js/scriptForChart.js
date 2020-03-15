//Tutorial https://stackoverflow.com/questions/4143901/how-can-i-access-google-sheet-spreadsheets-only-with-javascript
//https://stackoverflow.com/questions/38533957/google-sheets-api-how-to-publish-to-web-for-embeddable-sheet

/*------------------------------------------------------------------------------------------*/
// //Initially Display chart
// // Load google charts
// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);

// // Draw the chart and set the chart values
// function drawChart() {
// var data = google.visualization.arrayToDataTable([
// ['status', 'num'],
// ['Attended', 0],
// ['Absented', 1]
// ]);

// // Optional; add a title and set the width and height of the chart
// var options = {'max-width':310, 'max-height':190};

// // Display the chart inside the <div> element with id="piechart"
// var chart = new google.visualization.PieChart(document.getElementById('piechart'));
// chart.draw(data, options);
// }

/*------------------------------------------------------------------------------------------*/
function loadChart(rdata){
        //lấy dữ liệu từ sessionstorage đã được lưu ở index.js
        //var rdata = JSON.parse(sessionStorage.getItem(listUploadedFilesDashboard.value))["statistic"];
        //console.log(rdata);
        //localStorage.removeItem('data');
            // Load google charts
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);
            //console.log(rdata)
            // Draw the chart and set the chart values
            function drawChart() {
                try{
                    var data = google.visualization.arrayToDataTable([
                        ['status', 'num'],
                        ['Attended', rdata['sumAttended']],
                        ['Absented', rdata['lastRow']-rdata['sumAttended']]
                        ]);
            
                        // Optional; add a title and set the width and height of the chart
                        var options = {'width':310, 'height':190};
            
                        // Display the chart inside the <div> element with id="piechart"
                        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                        chart.draw(data, options);
                }
            catch(err){}
        }
}
//window.setInterval(loadChart, 100);
