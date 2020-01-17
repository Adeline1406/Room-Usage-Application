"use strict";

//Retrieve  the data of roomUsageList from storage

//var roomUsageListStorage = retrieveRoomUsage();
var roomUsageListStorage = testDataFunc();


if (roomUsageListStorage !== null) {
    for (let index = 0; index < roomUsageListStorage.arrayLength ; index++) {
        roomUsageListStorage.roomUsageInstance(index).decodeJSONTimeChecked();
    }
} else {
    console.log("roomUsageListStorage is null!")
}


let building = roomUsageListStorage.aggregateBy(roomUsageInstanceList.building);
console.log(building)

for (let prop in building) {
    console.log(building[prop]._roomList)
    let 
}


