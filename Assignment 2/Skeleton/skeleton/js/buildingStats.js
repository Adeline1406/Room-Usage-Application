"use strict";

//Retrieve  the data of roomUsageList from storage
if (useTestData === true){
    var roomUsageListStorage = testDataFunc();
} else {
    var roomUsageListStorage = retrieveRoomUsage();
}

function redTable(buildingStat2, shade, classNeeded = false) {
    let returnVal = ""
    if (buildingStat2 > 0) {
        if (classNeeded === true) {
            returnVal = " class=\""
        }
        
        returnVal += " mdl-color--red-" + shade;
        
        if (classNeeded === true) {
            returnVal += "\""
        }
        return returnVal;
    } else {
        return returnVal;
    }
}



if (roomUsageListStorage !== null) {
    for (let index = 0; index < roomUsageListStorage.arrayLength ; index++) {
        roomUsageListStorage.roomUsageInstance(index).decodeJSONTimeChecked();
    }
    
    let building = roomUsageListStorage.aggregateBy(roomUsageInstanceList.building);

    let content = document.getElementById("content");

    for (let prop in building) {
        let buildingStats = statisticsGenerator(building[prop])

        let newBuilding = "<div class=\"mdl-cell mdl-cell--4-col" + redTable(buildingStats[2], 300) + "\"><table class=\"observation-table mdl-data-table mdl-js-data-table mdl-shadow--2dp" + redTable(buildingStats[2], 300) + "\"><thead" + redTable(buildingStats[2], 300, true) + "><tr" + redTable(buildingStats[2], 300, true) + "><th class=\"mdl-data-table__cell--non-numeric" + redTable(buildingStats[2], 700) + "\"><h4>" + buildingStats[0] + "</h4></th></tr></thead><tbody" + redTable(buildingStats[2], 500, true) + "><tr" + redTable(buildingStats[2], 500, true) + "><td class=\"mdl-data-table__cell--non-numeric" + redTable(buildingStats[2], 300) + "\">" +                                             
                          "Number of observations: " + buildingStats[1] + "<br />" +
                          "Wasteful observations: " + buildingStats[2] + "<br />" +
                          "Average seat utilisation: " + buildingStats[3] + "%<br />" +
                          "Average lights utilisation: " + buildingStats[4] + "%<br />" +
                          "Average heating/cooling utilisation: " + buildingStats[5] + "%<br />" +
                          "</td></tr></tbody></table></div>"
        content.innerHTML += newBuilding
    }
} else {
    console.log("roomUsageListStorage is null!")
    let content = document.getElementById("content");
    let noObservation = 
                    "<div class=\"mdl-cell mdl-cell--4-col\"><table class=\"mdl-data-table mdl-js-data-table mdl-shadow--2dp\"><tbody>"+
                    "<tr><td class=\"mdl-data-table__cell--non-numeric\">" + "No Observation " + "</td></tr></tbody></table></div>";
    content.innerHTML += noObservation;
    
}




function statisticsGenerator(buildingProp) {
    let buildingName = buildingProp._roomList[0].buildingAddress
    let numObservations = buildingProp._roomList.length
    let numWasteful = 0
    let numUsedSeats = 0
    let numAllSeats = 0
    let numLightsOn = 0
    let numHeatCool = 0
    for (let index = 0; index < numObservations; index++) {
        numUsedSeats += buildingProp._roomList[index]._seatsUsed
        numAllSeats += buildingProp._roomList[index]._seatsTotal
        if (buildingProp._roomList[index]._lightsOn === true) {
            numLightsOn += 1
        }
        if (buildingProp._roomList[index]._heatingCoolingOn === true) {
            numHeatCool += 1
        }
        
        if ((buildingProp._roomList[index]._seatsUsed === 0) && (buildingProp._roomList[index]._lightsOn === true || buildingProp._roomList[index]._heatingCoolingOn === true)) {
            numWasteful += 1
        }
    }

    let seatUtilisation = (numUsedSeats / numAllSeats) * 100
    let lightsUtilisation = (numLightsOn / numObservations) * 100
    let heatCoolUtilisation = (numHeatCool / numObservations) * 100
    seatUtilisation = seatUtilisation.toFixed(2)
    lightsUtilisation = lightsUtilisation.toFixed(2)
    heatCoolUtilisation = heatCoolUtilisation.toFixed(2)
    
    if (isNaN(seatUtilisation) === true) {
        seatUtilisation = 0.00
    }
    
    return [buildingName, numObservations, numWasteful, seatUtilisation, lightsUtilisation, heatCoolUtilisation]
}
