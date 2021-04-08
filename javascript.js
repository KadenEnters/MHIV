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
let db = firebase.firestore();
let clientsRef = db.collection("clients");
clientsRef.get().then((querySnapshot) => {
    LoadTable(querySnapshot);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    })
});
