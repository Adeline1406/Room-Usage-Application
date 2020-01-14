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
    
    getRoomNumber(){
        return this._roomNumber;
    }
    getAddress(){
        return this._address;
    }
    getLightsOn(){
        return this._lightsOn;
    }
    getHeatingCoolingOn(){
        return this._heatingCoolingOn;
    }
    getSeatsUsed(){
        return this._seatsUsed;
    }
    getSeatsTotal(){
        return this._seatsTotal;
    }
    
    getTime(){
        return this._timeChecked;
    }

}

class RoomUsageList
{
    constructor()
    {
        this._roomList = [];
        

    }
    
    addRoomUsage(roomUsageInstance)
    {
        this._roomList.push(roomUsageInstance);
        
        return this._roomList;
    }
    
    aggregateBy(propname, obj){
        this._roomList[propname].push(obj)
    }

}

const STORAGE_KEY = 'ENG1003 - RoomUseList'
let roomUsageInstanceList = new RoomUsageList();

function storeRoomUsage(roomUsageInstanceList){
    if (typeof(Storage) !== "undefined"){
        
        let lst = JSON.stringify(roomUsageInstanceList)
        window.localStorage.setItem(STORAGE_KEY,lst);
        
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
