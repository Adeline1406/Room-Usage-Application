"use strict";

function clearForm(){
    document.getElementById("roomNumber").value = "";
    document.getElementById("address").value = "";
    document.getElementById("seatsUsed").value = "";
    document.getElementById("seatsTotal").value = "";
}

function saveForm(){
    let error = "Error in ";
    let roomNumber = document.getElementById("roomNumber").value;
    let address = document.getElementById("address").value;
    let lightsOn = document.getElementById("lights").checked;
    let heatingCoolingOn= document.getElementById("heatingCooling").checked;
    let seatsUsed = Number(document.getElementById("seatsUsed").value);
    let seatsTotal = Number(document.getElementById("seatsTotal").value);  
    let timeChecked = new Date();
    
    if (typeof(roomNumber) === "string" && roomNumber !== ""){
        var chkRoomNumber = roomNumber;
    }
    else {
         error += "Room number, ";
    }
    if (typeof(address) === "string" && address !== ""){
        var chkAddress = address;
    }
    else{
        error += "Address, ";    
    }
    if (typeof(lightsOn) === 'boolean'){
        var chkLightsOn = lightsOn;
    }
    else{
        error += "Lights, ";
    }
    if (typeof(heatingCoolingOn)==="boolean"){
        var chkHeatingCoolingOn = heatingCoolingOn;
    }
    else {
        error += "Heating, ";
    }
    
    if (typeof(seatsUsed)==="number" && seatsUsed > 0 && seatsUsed <= seatsTotal){
        var chkSeatsUsed = seatsUsed;
    }
    else {
        error += "Number of seats in use, ";
    }
    if(typeof(seatsTotal) === "number" && seatsTotal > 0){
        var chkSeatsTotal = seatsTotal;
    }
    else {
        error += "Number of available seats, ";
    }
    
    
    if (error ===  "Error in " ){
        let newRoomUsage = new RoomUsage(chkRoomNumber, chkAddress, chkLightsOn, chkHeatingCoolingOn, chkSeatsUsed, chkSeatsTotal, timeChecked);
        console.log(newRoomUsage);
    }
    else {
        document.getElementById("errorMessages").innerHTML += error;
    }
        

}

let posOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function posSuccess(userPosition){
    let latitude = userPosition.coords.latitude
    let longitude = userPosition.coords.longitude
    let apiURL = "https://api.opencagedata.com/geocode/v1/json?key=2705e58f3a424ef2ae45adeb3faeadf2"
    let requestURL = apiURL
    + "&q=" + encodeURIComponent(latitude + "," + longitude)
    + "&pretty=1&no_annotations=1&jsonp=callbackFunctionName"
    
    let newRequest = new XMLHttpRequest();
    newRequest.open("GET", requestURL, true)
    newRequest.onload = function() {
        if (newRequest.status == 200) {
            
        } else if (newRequest.status <= 500) {
            
        } else {
            console.log("Opencagedata server error!")
        }
    
    }
    
    document.getElementById("address").value = 
}

function posError(userError){
    console.log("There is an error with getCurrentPosition()!")
}

function getAddressCheck(){
    let checkbox = document.getElementById("useAddress");
    if (checkbox.checked == true){
        navigator.geolocation.watchPosition(posSuccess, posError, posOptions)
    }
}