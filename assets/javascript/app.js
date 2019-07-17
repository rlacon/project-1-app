$(document).ready(function () {


    let firebaseConfig = {
        apiKey: "AIzaSyCbygKsxIHGt2vS_7yQXIzlxIuri_EGZtc",
        authDomain: "writer-haven.firebaseapp.com",
        databaseURL: "https://writer-haven.firebaseio.com",
        projectId: "writer-haven",
        storageBucket: "",
        messagingSenderId: "474396693227",
        appId: "1:474396693227:web:f156b5abddd0080c"
      };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let database = firebase.database();


    //-------Save story content

    loop = (genre) => {
        let values = Object.values(genre)
        console.log(values);
        for (let value of values) {
            $('#settingField').text(values[0])
            $('#firstPlotPointField').text(values[1])
            $('#midpointField').text(values[2])
            $('#climaxField').text(values[3])
        }
    }

    $('#storySubmit').on('click', () => {
        
        event.preventDefault();
        alert("Story saved!");
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
        let post = snapshot.val();
        let newStory = post.story.slice(0,150);
    

        $('#story1').text(newStory);
        $('#storyField').text(post.story)
       
        let dayOfWeek = snapshot.val().day;
        let wordCount = snapshot.val().wordCount;
        console.log(dayOfWeek)
        console.log(wordCount)  
        switch (dayOfWeek) {
            case 'Monday':
               return $('#day1').text(wordCount);
            case 'Tuesday':
               return $('#day2').text(wordCount);
            case 'Wednesday':
                return $('#day3').text(wordCount);
            case 'Thursday':
                return $('#day4').text(wordCount);
            case 'Friday':
                return $('#day5').text(wordCount);
            case 'Saturday':
                return $('#day6').text(wordCount);
            case 'Sunday':
                return $('#day7').text(wordCount);
        }
    

    })


  
    getWordCount = (str) => {
        let regex = /\S+/g;
        let found = str.match(regex)
        return found.length
    }



    //------Genre
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



    //   getActionPlot_1 = () => {
    //    let randomPlot = action.plotOne[Math.floor(Math.random() * action.plotOne.length)]
    //   return randomPlot

    //   }
    //   getActionSetting = () => {
    //     let randomSetting = action.setting[Math.floor(Math.random() * action.setting.length)]
    //     return randomSetting
    //}


    //-------Choose genre

    $('#action').on('click', () => {
        loop(action)
        $('.mainContent').show();
        $('.storyChoices').css('display', 'none');
    })

    $('#horror').on('click', () => {
        loop(horror)
        $('.mainContent').show();
        $('.storyChoices').css('display', 'none');
    })

    $('#scifi').on('click', () => {
        loop(scifi)
        $('.mainContent').show();
        $('.storyChoices').css('display', 'none');
    })

    $('#mystery').on('click', () => {
        loop(mystery)
        $('.mainContent').show();
        $('.storyChoices').css('display', 'none');
    })

    //-------Ajax calls and events for Dictionary and Thesaurus

    $('#userT').on('click', () => {
        event.preventDefault();
        $('#thesaurus').empty();

        let item = $('#userThes').val().trim().toLowerCase()
        let list = $('#thesaurus').css({ 'font-size': '16px' })
        $('#userThes').val('')
        list.append(`<li id=thes>  ${item}  </li>`).css({ 'padding-right': '0px', 'font-size': '16px', 'list-style': 'none', 'text-align': 'left' })
        //$('#definethes').append('<p class=border border-success id=synonym><strong></strong></p>')
        //$('#synonym').before('<h3 id=wordThes>' + userThes + '</h3>')
        //$('#userThes').val('')

        let query_2 = "https://dictionaryapi.com/api/v3/references/thesaurus/json/" + item + "?&key=16c11365-c317-4d39-aa7c-62632093e7ef"

        $.ajax({
            url: query_2,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            let thes = response[0].meta.syns[0].map(item => item)
            console.log(thes)
            $('#thes').append(`:  ${thes.join(' , ')}`)

            //$('#synonym').text(thes.join(' , '))
            //$('#wordThes').append(' :synonyms')
        })
    })
    //Quote AJAX CALL
    var queryURL = "https://api.quotable.io/random";
   $.ajax({
       url: queryURL,
       method: "GET"
   }).then(function (response) {
       console.log(response);
     
       let quotes = $("<h2>").text(response.content);
       let author = $("<h3>").text(response.author).css('text-decoration', 'underline')
       $("#quoteSection").empty();
       $("#quoteSection").append(quotes);
       $('#quoteSection').append(author);
   });
   
}) // End of jQuery ready()
