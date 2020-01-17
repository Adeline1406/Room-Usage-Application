"use strict";

function showOccupancy(roomUsageInstance){
    
    let time = roomUsageInstance.timeChecked;
    let amOrPm = " am";
    let hours = time.getHours();
    if (hours > 12){
        hours -= 12;
        amOrPm = " pm";
    }
    
    //convert the date and the month into a string
    let monthString = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug", "Sep", "Oct","Nov","Dec"];
    let dateString = time.getDate() +" "+ monthString[time.getMonth()];
    
    let timeString = hours+":"+ time.getMinutes() +":"+ time.getSeconds() + amOrPm;
    
    //lighting
    let lights = roomUsageInstance.lightsOn;
    let lightsOnOff ="";
    
    if (lights === true){lightsOnOff = "On";}
    else {lightsOnOff = "Off";}
    
    //air conditioning
    let heatCool= roomUsageInstance.heatingCoolingOn;
    let heatCoolOnOff = "";
    
    if (heatCool === true){heatCoolOnOff= "On";}
    else {heatCoolOnOff = "Off";}
    
    let newOccupancy = 
        "<div class=\"mdl-cell mdl-cell--4-col\"><table class=\"mdl-data-table mdl-js-data-table mdl-shadow--2dp\"><thead><tr><th class=\"mdl-data-table__cell--non-numeric\"><h5>" + "Worst occupancy for 8 am " + "</h5></th></tr></thead>" + "<tbody><tr><td class=\"mdl-data-table__cell--non-numeric\"><div><b>" + roomUsageInstance.buildingAddress + "</b></div> <div>Occupancy: " + roomUsageInstance.seatsUsed/roomUsageInstance.seatsTotal + "</div><div>Heating/cooling: " + heatCoolOnOff + "</div> <div>Lights: " + lightsOnOff + "</div> <div><font color="grey"><i>" + dateString + ", " + timeString + "</i></font></div> </td></tr></tbody>"
}

showOccupancy();

console.log("hi 2")