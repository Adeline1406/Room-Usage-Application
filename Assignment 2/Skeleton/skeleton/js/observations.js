//Example for class, should be connected to the RoomUsageList

var time = new Date();
var exampleRoom = new RoomUsage (111, "Clayton", true, true, 2, 10, time);

console.log(exampleRoom);

var timeString = time.getHours() +":"+ time.getMinutes() +":"+ time.getSeconds();
var month = time.getMonth();
var monthString = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug", "Sep", "Oct","Nov","Dec"];


var date = time.getDate();

var dateString = date +" "+ monthString[month];

// Element

;var node = document.createElement('div');
node.className = "mdl-cell mdl-cell--4-col";

var table = document.createElement('table');
table.className = "mdl-data-table mdl-js-data-table mdl-shadow--2dp";

var br = document.createElement('br');


// Head

var thead = document.createElement('thead');

var trHead = document.createElement('tr');

var th = document.createElement('th');
th.className = "mdl-data-table__cell--non-numeric";

var h4Date = document.createElement('h4');
h4Date.className = "date";
var dateText = document.createTextNode(dateString);
h4Date.appendChild(dateText);

var h4Head = document.createElement('h4');
/*
var head = "Address" ++ "Rm" + 1111;
var headText = document.createTextNode(head);
h4Head.appendChild(headText);
*/

var address = document.createTextNode("The Addresssssssss");
h4Head.appendChild(address);
h4Head.appendChild(br);
var room = document.createTextNode("Rm "+ 12321 );
h4Head.appendChild(room);

th.appendChild(h4Date);
th.appendChild(h4Head);
trHead.appendChild(th);
thead.appendChild(trHead);

// End Head

// Body
var tbody = document.createElement('tbody');

var trBody = document.createElement('tr');

var td = document.createElement('td');
td.className = "mdl-data-table__cell--non-numeric";

var info = "\n"+
    "Time :" + timeString +"\n" +
    "Lights" + "(fill)" +"";
var infoText = document.createTextNode(info);

td.appendChild(infoText);

// Button Delete

var button = document.createElement('button');
button.className = "mdl-button mdl-js-button mdl-button--icon";
button.onclick = "deleteObservationAtIndex(" + "a number ...."+ ")";

var i = document.createElement('i');
i.className = "material-icons";

var deleteText = document.createTextNode("delete");
i.appendChild(deleteText);

button.appendChild(i);
td.appendChild(button);

// End Button Delete

trBody.appendChild(td);
tbody.appendChild(trBody);



// End Body

table.appendChild(thead);
table.appendChild(tbody);

node.appendChild(table);

// End Element

var content = document.getElementById("content");
content.appendChild(node);
