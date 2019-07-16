$(document).ready(function () {

    $('#day').text(moment().format('dddd'))


    //$('#data').text(localStorage.getItem('wordcount'))

    //This is going to be used for the storing the word count in the database. Tracks the number of words written in the textarea. 
    //Need a button (save) to submit the form, need an event listener 'on, submit' to send data to firebase. 

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

    }

    //These objects are converted into arrays.
    let action = new getGenre(
        'A desolate wasteland',
        'A lone man struggles to make his way through the wastes in search of his estranged family',
        'Lone man meets enemy',
        'Man defeats battle in close battle that leaves him scarred mentally and physically')
    let horror = new getGenre(
        'A haunted mansion',
        'A woman receives a message from someone who she thinks is still alive',
        'Woman goes to investigate mysterious message',
        'Woman encounters and confronts evil that exists within the mansion')
    let scifi = new getGenre(
        'A derelict spaceship',
        'An astronaut wakes up in stasis to find hes the lone survivor on a mining vessel',
        'He discovers can alien force has massacred his crew and left him alive, but for what reason?',
        'Discovers reason, conflict resolution')
    let mystery = new getGenre(
        'Rural America, 1930',
        'A man who does not age seeks to find out why after being alive for more than 200 years',
        'He discovers one of his family members was a witch and cursed him with immortality',
        'Resolves the immortality and finally dies')


    console.log(action.plotOne)
    //   getActionPlot_1 = () => {
    //    let randomPlot = action.plotOne[Math.floor(Math.random() * action.plotOne.length)]
    //   return randomPlot

    //   }
    //   getActionSetting = () => {
    //     let randomSetting = action.setting[Math.floor(Math.random() * action.setting.length)]
    //     return randomSetting
    //}
    $('#storySubmit').on('click', () => {
        let story = $('#storyField').val().trim()
        getWordCount(story)
    })

    $('#action').on('click', () => {
        //     $('#loop-info-1').text(getActionSetting())
        //    $('#loop-info-2').text(getActionPlot_1())
        loop(action)
        $('.mainContent').show();
        $('nav').css('display','none');




    })

    $('#horror').on('click', () => {
        loop(horror)



    })

    $('#scifi').on('click', () => {
        loop(scifi)


    })

    $('#mystery').on('click', () => {
        loop(mystery)


    })

    loop = (genre) => {
        let values = Object.values(genre)
        for (let value of values) {

            $('#loop-info-1').text(values[0])
            $('#loop-info-2').text(values[1])
            $('#loop-info-3').text(values[2])
            $('#loop-info-4').text(values[3])

        }
    }

    $('#clear').on('click', () => {
        $('#definitions').empty()

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
})