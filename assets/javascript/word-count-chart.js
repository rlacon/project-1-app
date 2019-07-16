


// code to get the word count into the table in the dashboard. 

database.ref().on('child_added', function (snapshot) {
    var dayOfWeek = childSnapshot.val().day;
    var wordCount = childSnapshot.val().wordCount;

    if (dayOfWeek === "Sunday") {
        var prevCount = parseInt($("#sundayBox").text());
        $("#sundayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Monday") {
        var prevCount = parseInt($("#mondayBox").text());
        $("#mondayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Tuesday") {
        var prevCount = parseInt($("#tuesdayBox").text());
        $("#tuesdayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Wednesday") {
        var prevCount = parseInt($("#wednesdayBox").text());
        $("#wednesdayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Thursday") {
        var prevCount = parseInt($("#thursdayBox").text());
        $("#thursdayBox").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Friday") {
        var prevCount = parseInt($("#friday").text());
        $("#friday").text(prevCount += parseInt(wordCount));
    }
    else if (dayOfWeek === "Saturday") {
        var prevCount = parseInt($("#saturdayBox").text());
        $("#saturdayBox").text(prevCount += parseInt(wordCount));
    }
})
