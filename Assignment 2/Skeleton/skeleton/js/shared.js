"use strict";

class RoomUsage
{
    constructor(roomNumber, address, lightsOn, heatingCoolingOn, seatsUsed, seatsTotal, timeChecked) {
        
        this._roomNumber = roomNumber;
        this._address = address;
        this._lightsOn = lightsOn;
        this._heatingCoolingOn = heatingCoolingOn;
        this._seatsUsed = seatsUsed;
        this._seatsTotal = seatsTotal;
        this._timeChecked = timeChecked;
        
    }

}

class RoomUsageList
{
    constructor()
    {
        this._roomList = [];
    }
    
    addRoomUsage(roomUsage){
        roomList.push(roomUsage);
    }

}

const STORAGE_KEY = 'ENG1003-RoomUseList'
let roomUsageInstance = new RoomUsage();
let roomUsageInstanceList = new RoomUsageList();

function storeRoomUsage(){
    if (typeof(Storage) !== "undefined"){
        
        roomUsageInstanceList.addRoomUsage(roomUsageInstance);
        window.localStorage.setItem(STORAGE_KEY,roomUsageInstance);
        displayMessage('Room Usage Instance stored.',3000);
        
    }
    else{
        console.log("Error: localStorage is not supported by current browser.");
        
    }
}
    

function retrieveRoomUsage(){
    if (typeof(Storage) !== "undefined"){
        
        document.getElementById("outputArea").innerHTML = localStorage.getItem(roomUsageInstance);

    }
    else{
        console.log("Error: localStorage is not supported by current browser.");
        
    }
    
    
}
