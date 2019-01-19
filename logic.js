// Initialize Firebase
var config = {
    apiKey: "AIzaSyDxpt5YbtSY_vWOQgP2Tez891JsATveFRA",
    authDomain: "train-scheduler-e6f77.firebaseapp.com",
    databaseURL: "https://train-scheduler-e6f77.firebaseio.com",
    projectId: "train-scheduler-e6f77",
    storageBucket: "",
    messagingSenderId: "128442507709"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on(
    'child_added', function (childSnapshot) {
        console.log(childSnapshot)
    }
)

var trainName = "";
var destination = "";
var firstTrain = "";
var freq = 0;

$(function onLoad() {
    document.getElementById("submitBtn").addEventListener("click", submitBtnClicked);
    database.ref().on(
        'child_added', function (childSnapshot) {
            console.log(childSnapshot)
        }
    )
});

function submitBtnClicked() {
    console.log("hey now");
    event.preventDefault();
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#freq").val().trim();

    var trainData = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    database.ref().push(trainData);

    // document.createElementById("div")



};
// database.ref().on(
//     "child_added",
//     function (childSnapshot) {
//         var snapshotVal = childSnapshot.val();
//         console.log("yada yada");
//         var timesheetBody = document.getElementById("timesheetBody");
//         var row = document.createElement("div")
//         row.classList.add("row");
//         timesheetBody.appendChild(row);
//         var trainNameCol = document.createElement("div");
//         trainNameCol.className = "col";
//         trainNameCol.innerHTML = snapshotVal.trainName;
//         var destinationCol = document.createElement("div");
//         destination.className = "col";
//         destinationCol.innerHTML = snapshotVal.destination;
//         var firstTrainCol = document.createElement("div")
//         firstTrainCol.className = "col";
//         firstTrainCol.innerHTML = snapshotVal.firstTrain;
//         var frequencyCol = document.createElement("div")
//         frequencyCol.className = "col";
//         frequencyCol.innerHTML = snapshotVal.frequency;
//         row.appendChild(trainNameCol, destinationCol, firstTrainCol, frequencyCol);

//         // tblRow.addClass("row")
//         console.log(snapshotVal.trainName);
//         console.log(snapshotVal.destination);
//         console.log(snapshotVal.firstTrain);
//         console.log(snapshotVal.frequency);
//         });