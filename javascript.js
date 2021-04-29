$(init);
let config = {
    apiKey: "AIzaSyBkfXvj4J3HzaufCBFIHMulfwbVkGh3VO0",
    authDomain: "mhvi-82ea7.firebaseapp.com",
    projectId: "mhvi-82ea7",
    storageBucket: "mhvi-82ea7.appspot.com",
    messagingSenderId: "54593296978",
    appId: "1:54593296978:web:0e3bf1a1d15e5ff6281d8b"
};
firebase.initializeApp(config);
db = firebase.firestore();
var clientsRef = db.collection("clients");
clientsRef.get().then((querySnapshot) => {
    console.log("Loaded Clients")
});
function init() {
    $('#upload').on('click', addClient);
    $('#search').on('click', searchClient);
}
function LoadTable(querySnapshot) {
    var tableRow='';
    querySnapshot.forEach(function(doc) {
        var document = doc.data();
        tableRow += '<tr>';
        tableRow += '<td class="lname">' + document.LastName + ',</td>';
        tableRow += '<td class="fname">' + document.FirstName + '</td>';
        tableRow += '<td>           </td>';
        tableRow += '<td><input type="button" id="edit" value="Edit"></td>';
        tableRow += '<td><input type="button" id="visit" value="Visit"></td>';
        tableRow += '<td><input type="button" id="service" value="Service"></td>';
        tableRow += '</tr>';
    });
    $('#tbody').html(tableRow);
}
function addClient() {
    console.log("test")
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
        FirstName: fname,
        LastName: lname,
        LastName_lower: lname.toLowerCase(),
        Address: address,
        City: city,
        State: state,
        ZipCode: zipcode,
        IsHomeless: isHomeless,
        Location: location,
        PhoneNumber: phonenumber,
        Email: email,
        Gender: gender,
        Birthday: birthday,
        Ssn: ssn,
        Race: race,
        Income: income,
        Income: incomeAmount,
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
    console.log("test")
    let lName = $('#lastName').val().toLowerCase();
    clientsRef.where("LastName_lower", "==", lName)
        .get()
        .then((querySnapshot) => {
            LoadTable(querySnapshot);
        });
}

// clientsRef.get().then((querySnapshot) => {
//     LoadTable(querySnapshot);
//     querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//     })
// });

