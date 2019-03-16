// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRtx4ZVnZDa5atOiRfE7r9284NQU0BNTU",
    authDomain: "makeavacay.firebaseapp.com",
    databaseURL: "https://makeavacay.firebaseio.com",
    projectId: "makeavacay",
    storageBucket: "",
    messagingSenderId: "611821931736"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {

    //https://developers.zomato.com/documentation

    var submitButton = $("#submit");
    var inputField = $("#input");

    // when the submit button is clicked...
    submitButton.on("click", function (event) {
        event.preventDefault();

        database.ref().set({
            location: inputField.val()
        });

    });

});


