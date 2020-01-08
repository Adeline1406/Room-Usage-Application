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