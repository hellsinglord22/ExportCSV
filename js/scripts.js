const $    = require('jquery'); 
const generator = require('./generator');
const data = [{
  "first_name": "Pamela",
  "last_name": "Vasquez",
  "email": "pvasquez0@hao123.com",
  "gender": "Female",
  "ip_address": "23.25.207.232"
}, {
  "first_name": "Dorothy",
  "last_name": "Phillips",
  "email": "dphillips1@cloudflare.com",
  "gender": "Female",
  "ip_address": "63.18.95.3"
}, {
  "first_name": "Bonnie",
  "last_name": "Myers",
  "email": "bmyers2@360.cn",
  "gender": "Female",
  "ip_address": "20.35.165.143"
}, {
  "first_name": "Brian",
  "last_name": "Roberts",
  "email": "broberts3@sfgate.com",
  "gender": "Male",
  "ip_address": "143.40.23.52"
}, {
  "first_name": "Robert",
  "last_name": "Hawkins",
  "email": "rhawkins4@alexa.com",
  "gender": "Male",
  "ip_address": "212.222.72.3"
}, {
  "first_name": "Anne",
  "last_name": "Gardner",
  "email": "agardner5@w3.org",
  "gender": "Female",
  "ip_address": "52.84.209.224"
}, {
  "first_name": "Beverly",
  "last_name": "Mendoza",
  "email": "bmendoza6@eventbrite.com",
  "gender": "Female",
  "ip_address": "144.0.189.179"
}, {
  "first_name": "Linda",
  "last_name": "Richards",
  "email": "lrichards7@comsenz.com",
  "gender": "Female",
  "ip_address": "139.184.3.235"
}, {
  "first_name": "Ryan",
  "last_name": "Jackson",
  "email": "rjackson8@myspace.com",
  "gender": "Male",
  "ip_address": "19.85.134.87"
}, {
  "first_name": "Daniel",
  "last_name": "Gutierrez",
  "email": "dgutierrez9@ft.com",
  "gender": "Male",
  "ip_address": "100.92.67.60"
}]; 


$(document).ready(function(){
    $('#people')[0].append(JSON.stringify(data, null, 2));

    $('#download').on('click', function(event){
        JSONToCSVConvertor(data, 'PeopleReport', true);
    });

});


function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}