
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


let database = firebase.database();



/*
getWordCount = (str) => {
    let regex = /\S+/g;
    let found = str.match(regex)
    console.log(found.length)
  
  $('#data').text(found.length)
}

*/





database.ref().on('child_added', function (snapshot) {

    let dayOfWeek = childSnapshot.val().day;
    let wordCount = childSnapshot.val().wordCount;

    if (dayOfWeek === "Sunday") {
        let prevCount = parseInt($("#sundayBox").text());
        $("#sundayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Monday") {
        let prevCount = parseInt($("#mondayBox").text());
        $("#mondayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Tuesday") {
        let prevCount = parseInt($("#tuesdayBox").text());
        $("#tuesdayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Wednesday") {
        let prevCount = parseInt($("#wednesdayBox").text());
        $("#wednesdayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Thursday") {
        let prevCount = parseInt($("#thursdayBox").text());
        $("#thursdayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Friday") {
        let prevCount = parseInt($("#friday").text());
        $("#friday").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Saturday") {
        let prevCount = parseInt($("#saturdayBox").text());

        $("#saturdayBox").text(prevCount += parseInt(wordCount));
    }
})
}