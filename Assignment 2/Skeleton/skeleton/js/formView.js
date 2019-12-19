"use strict";

function clearForm(){
    document.getElementById("roomNumber").value = "";
    document.getElementById("address").value = "";
    document.getElementById("seatUsed").value = "";
    document.getElementById("seatTotal").value = "";
}

function saveForm(){
    let roomNumber = document.getElementById("roomNumber").value;
    let address = document.getElementById("address").value;
    let lightsOn = document.getElementById("lights").value;
    let heatingCoolingOn= document.getElementById("heatingCooling").value;
    let seatUsed = document.getElementById("seatsUsed").value;
    let seatTotal = document.getElementById("seatsTotal").value;  
    let timeChecked = new Date();
    let newRoomUsage = new RoomUsage(roomNumber, address, lightsOn, heatingCoolingOn, seatUsed, seatTotal, timeChecked);
    
    //document.getElementById("errorMessages").innerHTML += lightsOn;
}