$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyDoqpbR_9Fx_d72Gylbx7U4YhVkt7xG8TA",
        authDomain: "writehaven-d4cdf.firebaseapp.com",
        databaseURL: "https://writehaven-d4cdf.firebaseio.com",
        projectId: "writehaven-d4cdf",
        storageBucket: "",
        messagingSenderId: "892034757404",
        appId: "1:892034757404:web:cf80449495d59e83"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const database = firebase.database();
    //Hides firststory if no content is present in the database
    $('#firststory').hide()

    //-------Save story content
    function getGenre(setting, plotOne, midPoint, climax) {

        this.setting = setting;
        this.plotOne = plotOne;
        this.midPoint = midPoint;
        this.climax = climax;
    }

    //These objects are converted into arrays.
    let action = new getGenre(
        'Think about a wasteland of some form, urban environments, rural communities, war-torn areas etc',
        'A seemingly invulnerable central character should be introduced, the kind that bullets never seem to hit',
        'Tension building: Central character meets an enemy, rival, foe of some kind',
        'Climax: the tipping point of the story where the main character defeats the villain typically')
    let horror = new getGenre(
        'Think haunted mansion, cemetary, a lab where vile experiments are performed, small quiet towns, ghost towns',
        'The first act sets up the character or characters in question, usually something disturbing happens at some point to get the rest of the story going',
        'Tension building, confronting whatever supernatural entity or event has taken place, the characters should seem weak and vulnerable to whatever is happening',
        'Final confrontation with source of horror that occurs in the story')
    let scifi = new getGenre(
        'Think of a derelict spaceship, laboratory, anywhere with science vibes',
        'Character or characters are introduced, usually scientists, astronauts, explorers, roboticists',
        'Introduce a villain, mistake on the characters part that leads to an accident, AI going out of control etc',
        'Character deaths can occur at this point, or the final reveal of something previously unknown that is driving the action of the story')
    let mystery = new getGenre(
        'Think of a gathering among friends, law enforcement personell, a stranger who emerges suddenly from nowhere',
        'Introduction of either central character or several',
        'Event can occur at this point that is unexplainable, character\'s then seek to uncover the reason',
        'Tension comes to an end here with the reason for whatever events you decided to unleash comes to light')

    //Pulls content from genre object and populates story cards
    const getContent = (genre) => {
        $('#settingField').text(genre.setting)
        $('#firstPlotPointField').text(genre.plotOne)
        $('#midpointField').text(genre.midPoint)
        $('#climaxField').text(genre.climax)
    }

//Hides genre selection after they are clicked, displays story writing tools.
    let showHide = () => {
        $('.mainContent').show()
        $('.storyChoices').hide()
    }
    $('#action').on('click', () => {
        getContent(action)
        showHide()
    })

    $('#horror').on('click', () => {
        getContent(horror)
        showHide()
    })

    $('#scifi').on('click', () => {
        getContent(scifi)
        showHide()
    })

    $('#mystery').on('click', () => {
        getContent(mystery)
        showHide()
    })

//Regex expression to capture word count.
    getWordCount = (str) => {
        let regex = /\S+/g;
        let found = str.match(regex)
        return found.length
    }

//Saves whatever the user has written in the text box along with the structure(first point midpoint etc) saved to database
    $('#storySubmit').on('click', () => {

        event.preventDefault();

        alert("Story Saved!");
        let story = $('#storyField').val().trim()

        let setting = $('#settingField').val().trim()
        let firstPlotPoint = $('#firstPlotPointField').val().trim()
        let midPoint = $('#midpointField').val().trim()
        let climax = $('#climaxField').val().trim()
        let day = moment().format("dddd")
        let wordCount = getWordCount(story)

        database.ref().push({
            story: story,
            setting: setting,
            firstPlotPoint: firstPlotPoint,
            midPoint: midPoint,
            climax: climax,
            day: day,
            wordCount: wordCount
        });
    })

    database.ref().on('child_added', (snapshot) => {
        let post = snapshot.val()
        let newStory = post.story.slice(0, 150) + "..."
        console.log(typeof (post))
        console.log(typeof (post.story))
        //If there is content in the database, show the firststory element
        post === null ? $('#firststory').hide() : $('#firststory').show()

        $('#story').text(newStory);

        $('#storyField').text(post.story);

        let dayOfWeek = snapshot.val().day;
        let wordCount = snapshot.val().wordCount;
        //Pulls the day of the week from the database and compares it to the day in the table.
        switch (dayOfWeek) {
            case 'Monday':
                return $('#dayBox1').text(`${wordCount} words`);
            case 'Tuesday':
                return $('#dayBox2').text(`${wordCount} words`);
            case 'Wednesday':
                return $('#dayBox3').text(`${wordCount} words`);
            case 'Thursday':
                return $('#dayBox4').text(`${wordCount} words`);
            case 'Friday':
                return $('#dayBox5').text(`${wordCount} words`);
            case 'Saturday':
                return $('#dayBox6').text(`${wordCount} words`);
            case 'Sunday':
                return $('#dayBox7').text(`${wordCount} words`);
        }
    })


//Ajax call for thesaurus
    $('#userT').on('click', () => {
        event.preventDefault();
        $('#thesaurus').empty();

        let item = $('#userThes').val().trim().toLowerCase()
        let list = $('#thesaurus').css({ 'font-size': '16px' })
        $('#userThes').val('')
        list.append(`<li id=thes>  ${item}  </li>`).css({ 'padding-right': '0px', 'font-size': '16px', 'list-style': 'none', 'text-align': 'left' })
        

        let query_2 = "https://dictionaryapi.com/api/v3/references/thesaurus/json/" + item + "?&key=16c11365-c317-4d39-aa7c-62632093e7ef"

        $.ajax({
            url: query_2,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            let thes = response[0].meta.syns[0].map(item => item)
            console.log(thes)
            $('#thes').append(`:  ${thes.join(' , ')}`)
        })
    })

    //Quote AJAX CALL
    var queryURL = "https://api.quotable.io/random";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        let quotes = $("<h6>").text(response.content);
        let author = $("<h3>").text(response.author)
        $("#quoteSection").empty();
        $("#quoteSection").append(quotes);
        $('#quoteSection').append(author);
    });

}) 
