"use strict";
//Retrieve  the data of roomUsageList from storage

//var roomUsageListStorage = retrieveRoomUsage();
var roomUsageListStorage = testDataFunc();


if (roomUsageListStorage !== null) {
    for (let index = 0; index < roomUsageListStorage.arrayLength ; index++) {
        roomUsageListStorage.roomUsageInstance(index).decodeJSONTimeChecked();
        
    }
    let hour = roomUsageListStorage.aggregateBy(roomUsageInstanceList.hour);

    for (let prop in hour){
        if ( hour[prop] !== ""){
            hour[prop].sortByOccupancy();
            showOccupancy(hour[prop], prop);
        }
        else {
            console.log("There is no observation in "+ prop)
        }

    }
} else {
    console.log("roomUsageListStorage is null!")
    let content = document.getElementById("content");
    let noObservation = 
                    "<div class=\"mdl-cell mdl-cell--4-col\"><table class=\"mdl-data-table mdl-js-data-table mdl-shadow--2dp\"><tbody>"+
                    "<tr><td class=\"mdl-data-table__cell--non-numeric\">" + "No Observation " + "</td></tr></tbody></table></div>";
    content.innerHTML += noObservation;
    
}



function showOccupancy(roomUsageList, prop){
    
    let newOccupancy = 
        "<div class=\"mdl-cell mdl-cell--4-col\"><table class=\"mdl-data-table mdl-js-data-table mdl-shadow--2dp\"><thead><tr><th class=\"mdl-data-table__cell--non-numeric\"><h5>" + "Worst occupancy for " + prop + "</h5></th></tr></thead><tbody>";
    let listLength = 0;
    if(roomUsageList.arrayLength > 5){
        listLength = 5;
    }
    else {
        listLength = roomUsageList.arrayLength;
    }
    
    for (let index = 0; index < listLength; index++){
        let roomUsageInstance = roomUsageList.roomUsageInstance(index); 
    
        let time = roomUsageInstance.timeChecked;
        let amOrPm = " am";
        let hours = time.getHours();
        if (hours === 0){
            hours = 12;
        }
        else if (hours === 12){
            amOrPm = " pm";
        }
        else if ( hours > 12){
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



        newOccupancy += 
            "<tr><td class=\"mdl-data-table__cell--non-numeric\"><div><b>" + roomUsageInstance.buildingAddress + "</b></div> <div>Occupancy: " + (roomUsageInstance.occupancy * 100).toFixed(1) + " % </div><div>Heating/cooling: " + heatCoolOnOff + "</div> <div>Lights: " + lightsOnOff + "</div> <div><font color=\"grey\"><i>" + dateString + ", " + timeString + "</i></font></div> </td></tr></tbody>"
        }
    let content = document.getElementById("content");
    content.innerHTML += newOccupancy;
}

showOccupancy();