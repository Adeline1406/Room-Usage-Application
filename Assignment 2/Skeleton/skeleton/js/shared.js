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
        
        this.roomNumber = roomUsageObject._roomNumber;
        this.address = roomUsageObject._address;
        this.lightsOn = roomUsageObject._lightsOn;
        this.heatingCoolingOn = roomUsageObject._heatingCoolingOn;
        this.seatsUsed = roomUsageObject._seatsUsed;
        this.seatsTotal = roomUsageObject._seatsTotal;
        this.timeChecked = roomUsageObject._timeChecked;
    }
    
    set roomNumber(newValue){
        this._roomNumber = newValue;
    }
    get roomNumber(){
        return this._roomNumber;
    }
    
    set address(newValue){
        this._address = newValue;
    }
    get address(){
        return this._address;
    }
    
    set lightsOn(newValue){
        this._lightsOn = newValue;
    }
    get lightsOn(){
        return this._lightsOn;
    }
    
    set heatingCoolingOn(newValue){
        this._heatingCoolingOn = newValue;
    }
    get heatingCoolingOn(){
        return this._heatingCoolingOn;
    }
    
    set seatsUsed(newValue){
        this._seatsUsed = newValue;
    }
    get seatsUsed(){
        return this._seatsUsed;
    }
    
    set seatsTotal(newValue){
        this._seatsTotal = newValue;
    }
    get seatsTotal(){
        return this._seatsTotal;
    }
    
    set timeChecked(newValue){
        this._timeChecked = newValue;
    }
    get timeChecked(){
        return this._timeChecked;
    }
    decodeJSONTimeChecked(){
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
        
        this._roomList.push(roomUsageInstance);
        
    }
    
    initialiseFromRoomListPDO(roomUsageListObject){
        
        this._roomList = roomUsageListObject._roomList;
        
        console.log((this._roomList).length)
        
        for(let i = 0; i < (this._roomList).length; i++){
            var roomUsage = new RoomUsage();
            roomUsage.initialiseFromRoomPDO(this._roomList[i]);
            this._roomList[i] = roomUsage;
        }
    }
    
    roomUsageInstance(index){
        return this._roomList[index];
    }
    
    aggregateBy(propname, obj){
        this._roomList[propname].push(obj);
    }
    
    get arrayLength(){
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

function testData(){
    var roomUsageObj = JSON.parse(localStorage.getItem(testData));
    let newList = new RoomUsageList();
    newList.initialiseFromRoomListPDO(roomUsageObj);
    console.log(newList);
    return newList;
}
    

function retrieveRoomUsage(){
    if (typeof(Storage) !== "undefined"){
        
        
        var roomUsageObj = JSON.parse(localStorage.getItem(STORAGE_KEY));
        
        console.log(roomUsageObj);
        console.log(STORAGE_KEY)
        
        if (roomUsageObj == null) {
            console.log("roomUsageObj is null!")
            return null;
        } else {
            let newList = new RoomUsageList();
            newList.initialiseFromRoomListPDO(roomUsageObj);

            console.log(newList);

            return newList;
        }
        


    }
    else{
        console.log("Error: localStorage is not supported by current browser.");
        
    }
    
    
}

