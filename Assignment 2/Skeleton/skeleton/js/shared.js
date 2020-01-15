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
    
    initialiseFromRoomPDO(roomUsageObject){
        
        this._roomNumber = roomUsageObject._roomNumber;
        this._address = roomUsageObject._address;
        this._lightsOn = roomUsageObject._lightsOn;
        this._heatingCoolingOn = roomUsageObject._heatingCoolingOn;
        this._seatsUsed = roomUsageObject._seatsUsed;
        this._seatsTotal = roomUsageObject._seatsTotal;
        this._timeChecked = roomUsageObject._timeChecked;
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
    decodeJSONTime(){
        this._timeChecked = new Date(this._timeChecked);    
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
        (this._roomList).push(roomUsageInstance);
        
    }
    
    initialiseFromRoomListPDO(roomUsageListObject){
        
        this._roomList = roomUsageListObject._roomList;
        
        for(let i = 0; i < (this._roomList).length; i++){
            var roomUsage = new RoomUsage();
            roomUsage.initialiseFromRoomPDO(this._roomList[i]);
            this._roomList[i] = roomUsage;
        }
    }
    
    getRoomUsageInstance(index){
        return this._roomList[index];
    }
    
    aggregateBy(propname, obj){
        this._roomList[propname].push(obj);
    }
    
    length(){
        return this._roomList.length;
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
        
        var roomUsageObj = JSON.parse(localStorage.getItem(STORAGE_KEY));
        
        roomUsageInstanceList = new RoomUsageList();
        roomUsageInstanceList.initialiseFromRoomListPDO(roomUsageObj);
        
        return roomUsageInstanceList;

    }
    else{
        console.log("Error: localStorage is not supported by current browser.");
        
    }
    
    
}

