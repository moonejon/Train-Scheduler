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

var trainName = "";
var destination = "";
var firstTrain = "";
var freq = 0;

$(function onLoad() {
    document.getElementById("submitBtn").addEventListener("click", submitBtnClicked);
});

function submitBtnClicked() {
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
};

database.ref().on(
    "child_added",
    function (childSnapshot) {

        
        var snapshotVal = childSnapshot.val();
        
        var childFrequency = snapshotVal.frequency;
        
        var childFirstTrain = snapshotVal.firstTrain;

        var firstTimeConverted = moment(childFirstTrain, "HH:mm").subtract(1, "years");

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        var tRemainder = diffTime % childFrequency;

        var minutesTillTrain = childFrequency - tRemainder;

        var nextTrain = moment().add(minutesTillTrain, "minutes");

        var timesheetBody = document.getElementById("timesheetBody");
        var row = document.createElement("div")
        row.classList.add("row");
        timesheetBody.appendChild(row);

        var trainNameCol = document.createElement("div");
        trainNameCol.className = "col";
        trainNameCol.innerHTML = snapshotVal.trainName;

        var destinationCol = document.createElement("div");
        destinationCol.className = "col";
        destinationCol.innerHTML = snapshotVal.destination;

        var frequencyCol = document.createElement("div");
        frequencyCol.className = "col";
        frequencyCol.id = "frequency";
        frequencyCol.innerHTML = snapshotVal.frequency;

        var nextTrainCol = document.createElement("div");
        nextTrainCol.className = "col";
        nextTrainCol.innerHTML = nextTrain;

        var minutesAwayCol = document.createElement("div");
        minutesAwayCol.classList.add("col")
        minutesAwayCol.innerHTML = minutesTillTrain;

        row.appendChild(trainNameCol);
        row.appendChild(destinationCol);
        row.appendChild(frequencyCol);
        row.appendChild(nextTrainCol);
        row.appendChild(minutesAwayCol);

        });