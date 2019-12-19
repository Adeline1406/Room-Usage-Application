"use strict";

class RoomUsage
{
    constructor(roomNumber, address, lightsOn, heatingCoolingOn, seatUsed, seatTotal, timeChecked) {
        if (typeof(roomNumber) === "string" && roomNumber !== ""){
            this._roomNumber = roomNumber;
        }
        if (typeof(address) === "string" && address !== ""){
            this._address = address;
        }
        if (typeof(lightsOn) === 'boolean'){
            this._lightsOn = lightsOn;
        }
        
        if (typeof(heatingCoolingOn)==="boolean"){
            this._heatingCoolingOn = heatingCoolingOn;
        }
        if (typeof(seatUsed)==="number" && seatUsed >0 && seatUsed < seatTotal){
            this._seatsUsed = seatUsed;
        }
        
        if(typeof(seatTotal) === "number" && seatTotal > 0){
            this._seatsTotal = seatTotal;
        }
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