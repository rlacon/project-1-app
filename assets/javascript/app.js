$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyABqAZU7UeVQ7nA16mkhFxcmjTSM9cXKJA",
        authDomain: "dogwood-terra-183816.firebaseapp.com",
        databaseURL: "https://dogwood-terra-183816.firebaseio.com",
        projectId: "dogwood-terra-183816",
        storageBucket: "dogwood-terra-183816.appspot.com",
        messagingSenderId: "416717539320",
        appId: "1:416717539320:web:5cabe2f014923c29"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    //-------Save story content

    loop = (genre) => {
        let values = Object.values(genre)
        console.log(values);
        for (let value of values) {
            $('#loop-info-1').text(values[0])
            $('#loop-info-2').text(values[1])
            $('#loop-info-3').text(values[2])
            $('#loop-info-4').text(values[3])
        }
    }

    $('#storySubmit').on('click', () => {
        event.preventDefault();
        alert("Submit clicked");
        let story = $('#storyField').val().trim()
        let setting = $('#loop-info-1').text();
        let firstPlotPoint = $('#loop-info-2').text()
        let midPoint = $('#loop-info-3').text()
        let climax = $('#loop-info-4').text()
        getWordCount(story)

        database.ref().push({
            story: story,
            setting: setting,
            firstPlotPoint: firstPlotPoint,
            midPoint: midPoint,
            climax: climax
        });
    })
    $('#day').text(moment().format('dddd'))

    //$('#data').text(localStorage.getItem('wordcount'))

    getWordCount = (str) => {
        let regex = /\S+/g;
        let found = str.match(regex)

        localStorage.setItem('wordcount', found.length)
        $('#data').text(found.length)
        //Possibly remove from the top of the text document. Place directly into table.
        $('#word-count-text').text(found.length + ' words')
    }

    //------Genre
    function getGenre(setting, plotOne, midPoint, climax) {

        this.setting = setting;
        this.plotOne = plotOne;
        this.midPoint = midPoint;
        this.climax = climax;
        this.resolution = resolution


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
        'Rural America, 1930',
        'A man who does not age seeks to find out why after being alive for more than 200 years',
        'He discovers one of his family members was a witch and cursed him with immortality',
        'Resolves the immortality and finally dies')


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
        //     $('#loop-info-1').text(getActionSetting())
        //    $('#loop-info-2').text(getActionPlot_1())
        loop(action)
        $('.mainContent').show();
        $('nav').css('display', 'none');
    })

    $('#horror').on('click', () => {
        loop(horror)
        $('.mainContent').show();
        $('nav').css('display', 'none');
    })

    $('#scifi').on('click', () => {
        loop(scifi)
        $('.mainContent').show();
        $('nav').css('display', 'none');
    })

    $('#mystery').on('click', () => {
        loop(mystery)
        $('.mainContent').show();
        $('nav').css('display', 'none');
    })

    //-------Ajax calls and events for Dictionary and Thesaurus

    $('#userT').on('click', () => {
        event.preventDefault();
        $('#thesaurus').empty();

        let item = $('#userThes').val().trim().toLowerCase()
        let list = $('#thesaurus').css({ 'font-size': '16px' })
        $('#userThes').val('')
        list.append('<li id=thes>' + item + '</li>').css({ 'padding-right': '0px', 'font-size': '16px', 'list-style': 'none', 'text-align': 'left' })
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
            $('#thes').append(': ' + thes.join(' , '))

            //$('#synonym').text(thes.join(' , '))
            //$('#wordThes').append(' :synonyms')
        })
    })


}) // End of jQuery ready()
