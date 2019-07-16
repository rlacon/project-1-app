$(document).ready {


var firebaseConfig = {
    apiKey: "AIzaSyCetbRyR3StVbp6jLMRDqliRvo6u5TPCpk",
    authDomain: "write-haven-d0cda.firebaseapp.com",
    databaseURL: "https://write-haven-d0cda.firebaseio.com",
    projectId: "write-haven-d0cda",
    storageBucket: "",
    messagingSenderId: "379171859122",
    appId: "1:379171859122:web:c46c36b048700911"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//   getWordCount = (str) => {
//     let regex = /\S+/g;
//     let found = str.match(regex)
//     console.log(found.length);
// }

// code to get the word count into the table in the dashboard. 

database.ref().on('child_added', function (snapshot) {
    var dayOfTheWeek = childSnapshot.val().day;
    var wordCount = childSnapshot.val().wordCount;

    if (dayOfTheWeek === "Sunday") {
        var prevCount = parseInt($("#sundayBox").text());
        $("#sundayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfTheWeek === "Monday") {
        var prevCount = parseInt($("#mondayBox").text());
        $("#mondayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfTheWeek === "Tuesday") {
        var prevCount = parseInt($("#tuesdayBox").text());
        $("#tuesdayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfTheWeek === "Wednesday") {
        var prevCount = parseInt($("#wednesdayBox").text());
        $("#wednesdayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfTheWeek === "Thursday") {
        var prevCount = parseInt($("#thursdayBox").text());
        $("#thursdayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfTheWeek === "Friday") {
        var prevCount = parseInt($("#fridayBox").text());
        $("#friday").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfTheWeek === "Saturday") {
        var prevCount = parseInt($("#saturdayBox").text());
        $("#saturdayBox").text(prevCount += parseInt(wordCount));
    }
})
}