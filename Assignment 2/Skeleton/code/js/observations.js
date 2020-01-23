function showObservations(roomUsageInstance, index) {
	//convert the time into a string

	let time = roomUsageInstance.timeChecked;
	let amOrPm = " am";
	let hours = time.getHours();
	if (hours > 12) {
		hours -= 12;
		amOrPm = " pm";
	}

	let timeString = hours + ":" + time.getMinutes() + ":" + time.getSeconds() + amOrPm;

	//convert the date and the month into a string
	let monthString = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	let dateString = time.getDate() + " " + monthString[time.getMonth()];

	let lights = roomUsageInstance.lightsOn;
	let lightsOnOff = "";

	if (lights === true) {
		lightsOnOff = "On";
	}
	else {
		lightsOnOff = "Off";
	}

	let heatCool = roomUsageInstance.heatingCoolingOn;
	let heatCoolOnOff = "";

	if (heatCool === true) {
		heatCoolOnOff = "On";
	}
	else {
		heatCoolOnOff = "Off";
	}

	let newObservation =
		"<div class=\"mdl-cell mdl-cell--4-col\"><table class=\"observation-table mdl-data-table mdl-js-data-table mdl-shadow--2dp\"><thead><tr><th class=\"mdl-data-table__cell--non-numeric\"><h4 class=\"date\">" +
		dateString + "</h4><h4>" +
		roomUsageInstance.buildingAddress + "<br />" +
		"Rm " + roomUsageInstance.roomNumber + "</h4></th></tr></thead><tbody><tr><td class=\"mdl-data-table__cell--non-numeric\">" +
		"Time: " + timeString + "<br />" +
		"Lights: " + lightsOnOff + "<br />" +
		"Heating/cooling: " + heatCoolOnOff + "<br />" +
		"Seat usage: " + roomUsageInstance.seatsUsed + " / " + roomUsageInstance.seatsTotal + "<br/ >" +

		"<button class=\"mdl-button mdl-js-button mdl-button--icon\" onclick=\"deleteObservation(" + index +
		");\"><i class=\"material-icons\">delete</i></button></td></tr></tbody></table></div>";

	let content = document.getElementById("content");
	content.innerHTML += newObservation;
}

function searchObservations() {
	let searchVal = document.getElementById("searchField").value
	searchVal = searchVal.toLowerCase()

	let content = document.getElementById("content");
	content.innerHTML = "";

	for (let index = 0; index < roomUsageListStorage.arrayLength; index++) {
		let currentObj = roomUsageListStorage._roomList[index]
		let addressCheck = currentObj.buildingAddress.toLowerCase()
		let roomNum = currentObj.roomNumber.toLowerCase()

		if (addressCheck.includes(searchVal) === true || roomNum.includes(searchVal) === true) {
			showObservations(currentObj, index)
		}
	}
}

function deleteObservation(index) {

	roomUsageListStorage.removeRoomUsage(index);

	let content = document.getElementById("content");
	content.innerHTML = "";

	for (let index = 0; index < roomUsageListStorage.arrayLength; index++) {
		showObservations(roomUsageListStorage.roomUsageInstance(index), index);
	}

}

//Retrieve  the data of roomUsageList from storage
if (useTestData === true) {
	var roomUsageListStorage = testDataFunc();
}
else {
	var roomUsageListStorage = retrieveRoomUsage();
}

if (roomUsageListStorage !== null) {
	for (let index = 0; index < roomUsageListStorage.arrayLength; index++) {
		roomUsageListStorage.roomUsageInstance(index).decodeJSONTimeChecked();
		showObservations(roomUsageListStorage.roomUsageInstance(index), index);
	}

	//checking if the aggregateBy is working
	let hour = roomUsageListStorage.aggregateBy(roomUsageInstanceList.hour);
	let building = roomUsageListStorage.aggregateBy(roomUsageInstanceList.building);
	for (let prop in hour) {

		hour[prop].sortByOccupancy();

	}
	for (let prop in hour) {

		hour[prop].occupancy

	}
}
else {
	console.log("roomUsageListStorage is null!")
	let content = document.getElementById("content");
	let noObservation =
		"<div class=\"mdl-cell mdl-cell--4-col\"><table class=\"mdl-data-table mdl-js-data-table mdl-shadow--2dp\"><tbody>" +
		"<tr><td class=\"mdl-data-table__cell--non-numeric\">" + "No observations found. " + "</td></tr></tbody></table></div>";
	content.innerHTML += noObservation;

}

