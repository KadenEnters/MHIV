$(init);
let config = {
    apiKey: "AIzaSyBo5d4unLD61WSscuGztcMFcZMRE3MHV5g",
    authDomain: "mhvi-e8bdb.firebaseapp.com",
    projectId: "mhvi-e8bdb",
    storageBucket: "mhvi-e8bdb.appspot.com",
    messagingSenderId: "207439199201",
    appId: "1:207439199201:web:c68d573c5367acb2fbb0a0"
};
firebase.initializeApp(config);
db = firebase.firestore();
var clientsRef = db.collection("clients");
clientsRef.get().then((querySnapshot) => {
    console.log("Loaded Clients")
});
function init() {
    $('#upload').on('submit', addClient);
    $('#search').on('click', searchClient);
}
function LoadTable(querySnapshot) {
    var tableRow='';
    querySnapshot.forEach(function(doc) {
        var document = doc.data();
        tableRow += '<tr>';
        tableRow += '<td class="lname">' + document.LastName + ',</td>';
        tableRow += '<td class="fname">' + document.FirstName + '</td>';
        tableRow += '<td><input type="button" id="edit" value="Edit"></td>';
        tableRow += '<td><input type="button" id="visit" value="Visit"></td>';
        tableRow += '<td><input type="button" id="service" value="Service"></td>';
        tableRow += '</tr>';
    });
    $('#tbody').html(tableRow);
}
function addClient() {
    event.preventDefault();
    console.log("uploading")
    let intakeDate = $('#intakeDate').val();
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let address = $('#address').val();
    let city = $('#city').val();
    let state = $('#state').val();
    let zipcode = $('#zipcode').val();
    let isHomeless = $('#IsHomeless').val();
    let location = $('#location').val();
    let phonenumber = $('#phonenumber').val();
    let email = $('#email').val();
    let gender = $('#gender').val();
    let birthday = $('#birthday').val();
    let ssn = $('#ssn').val();
    let race = $('#race').val();
    let income = $('#income').val();
    let incomeAmount = $('#incomeAmount').val();
    let branch = $('#branch').val();
    let timeofService = $('#TimeofService').val();
    let ActiveDutyTime = $('#ActiveDutyTime').val();
    let serviceVerification = $('#ServiceVerification').val();

    clientsRef.add({
        IntakeDate: intakeDate,
        FirstName: fname,
        LastName: lname,
        LastName_lower: lname.toLowerCase(),
        Address: address,
        City: city,
        State: state,
        ZipCode: zipcode,
        IsHomeless: isHomeless,
       // Location: location,
        PhoneNumber: phonenumber,
        Email: email,
        Gender: gender,
        Birthday: birthday,
        Ssn: ssn,
        Race: race,
        Income: income,
        IncomeAmount: incomeAmount,
        Branch: branch,
        TimeofService: timeofService,
        ActiveTime: ActiveDutyTime,
        ServiceVerification: serviceVerification
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

function searchClient() {
    let lName = $('#lastName').val().toLowerCase();
    clientsRef.where("LastName_lower", "==", lName)
        .get()
        .then((querySnapshot) => {
            LoadTable(querySnapshot);
        });
}

clientsRef.get().then((querySnapshot) => {
    LoadTable(querySnapshot);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    })
});

$(document).ready(function(){
    let today = new Date();
    let date = today.getFullYear()+ '-' +(today.getMonth()+1)+ '-' +today.getDate()
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    document.getElementById("intakeDate").innerHTML = date + ' ' + time;
});

function getReport() {
    clientsRef.orderBy("intakeDate").limit(50);
}

function displayLocation() {
    var x = document.getElementById("IsHomeless").value;
    if (x=="Yes") {
        $(".locationStuff").show();
    } else if(x=="No") {
        $(".locationStuff").hide();
    }
}

function displayMaritalStatus() {
    var x = document.getElementById("MaritalStatus").value;
    if (x == "Married") {
        $(".hasSpouse").show();
    } else {
        $(".hasSpouse").hide();
        $(".hasSpousework").hide();
    }
}

function displayEmploymentStatus() {
    var x = document.getElementById("CurrentlyEmployed").value;
    if (x == "EmployedYes") {
        $(".hasJob").show();
        $(".hasNoJob").hide();
    } else {
        $(".hasNoJob").show();
        $(".hasJob").hide();
    }
}

function displaySpouseWorkStatus() {
    var x = document.getElementById("SpouseWork").value;
    if (x == "SpouseWorkYes") {
        $(".hasSpousework").show();
    } else {
        $(".hasSpousework").hide();
    }
}

function displayActiveduty() {
    var x = document.getElementById("ActiveDuty").value;
    if (x == "ActiveDutyYes") {
        $(".ActiveDutyTimeYes").show();
    } else {
        $(".ActiveDutyTimeYes").hide();
    }
}

