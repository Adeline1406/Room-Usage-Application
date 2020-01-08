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