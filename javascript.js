$(init);
let config = {
    apiKey: "AIzaSyA6AH_t3VIoxnLCml46uEL7YJHtSqTjcCg",
    authDomain: "mhvi-47418.firebaseapp.com",
    projectId: "mhvi-47418",
    storageBucket: "mhvi-47418.appspot.com",
    messagingSenderId: "49612761870",
    appId: "1:49612761870:web:825e8f6110c0b47b55855f",
    measurementId: "G-JM7RJY6625"
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
        tableRow +='<tr>';
        tableRow += '<td class="fname">' + document.FirstName + '</td>';
        tableRow += '<td class="lname">' + document.LastName + '</td>';
        tableRow += '<td class="editEmployee"><i class="fa fa-pencil" aria-hidden="true" style="color:green"></i></td>';
        /*        tableRow += '<td class="email">' + document.email + '</td>';
                tableRow += '<td class="age">' + document.age + '</td>';
                tableRow += '<td class="gender">' + document.gender + '</td>';
                tableRow += '<td class="yearsofexperience">' + document.yearsOfExperience + '</td>';
                tableRow += '<td class="isfulltime">' + document.isFullTime + '</td>';
                tableRow += '<td class="deleteEmployee"><i class="fa fa-trash" aria-hidden="true" style="color:red"></i></td>'*/
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
    let branch = $('#branch').val();
    let timeofService = $('#TimeofService').val();
    let vaBenefits = $('#VABenefits').val();
    let serviceVerification = $('#ServiceVerification').val();
    clientsRef.add({
        FirstName: fname,
        LastName: lname,
        Address: address,
        City: city,
        State: state,
        ZipCode: zipcode,
        IsHomless: isHomeless,
        Location: location,
        PhoneNumber: phonenumber,
        Email: email,
        Gender: gender,
        Birthday: birthday,
        Ssn: ssn,
        Race: race,
        Income: income,
        Branch: branch,
        TimeofService: timeofService,
        VABenefits: vaBenefits,
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
    let lName = $('#lastName').val();
    clientsRef.where("LastName", "==", lName)
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