$(document).ready(() => {
    
    console.log(moment().format("dddd"))
    $('#day').text(moment().format('dddd'))
    

    
    getWordCount = (str) => {
        let regex = /\S+/g;
        let found = str.match(regex)
        console.log(found.length)
        $('#data').text(found.length)
    }

    //------Genre
    function getGenre(genre, setting, plotOne, midPoint, climax) {
        this.genre = genre
        this.setting = setting;
        this.plotOne = plotOne;
        this.midPoint = midPoint;
        this.climax = climax;
    }

    let action = new getGenre('Action', 'A desolate wasteland where only the strong survive', 'A lone man struggles to make his way through the wastes in search of his estranged family', 'Lone man meets enemy', 'Man overcomes enemy')
    let horror = new getGenre('Horror', 'A haunted mansion', 'A woman receives a message from someone who she thinks is still alive', 'Woman goes to investigate mysterious message', 'Woman encounters and confronts a great evil lving within the mansion')
    let scifi = new getGenre('Scifi', 'A derelict spaceship', 'An astronaut wakes up in stasis to find hes the lone survivor on a mining vessel', 'He discovers can alien force has massacred his crew and left him alive, but for what reason?', 'Discovers reason, conflict resolution')
    let mystery = new getGenre('Mystery', 'Rural America, 1930', 'A man who does not age seeks to find out why after being alive for more than 200 years', 'He discovers one of his family members was a witch and cursed him with immortality', 'Resolves the immortality and finally dies')

    $('#action').on('click', () => {
        let title = $('#title').val().trim()
        localStorage.setItem(title, action.setting)
        getWordCount(title)
        loop(action)
    })

    $('#horror').on('click', () => {
        let title = $('#title').val().trim()
        localStorage.setItem(title, horror.setting)
        loop(horror)
    })

    $('#scifi').on('click', () => {
        let title = $('#title').val().trim()
        localStorage.setItem(title, scifi.setting)
        loop(scifi)
    })

    $('#mystery').on('click', () => {
        let title = $('#title').val().trim()
        localStorage.setItem(title, mystery.setting)
        loop(mystery)
    })

   loop = (genre) => {
    const values = Object.values(genre)
    for(const value of values) {
       console.log(value)
       $('#loop-info-1').text('Setting: ' + values[1])
       $('#loop-info-2').text('First Plot Point: ' + values[2])
       $('#loop-info-3').text('Midpoint: ' + values[3])
       $('#loop-info-4').text('Climax : ' + values[4])
   }
}

    $('#clear').on('click', () => {
        $('#definitions').empty()

    })


    //-------Ajax calls and events for Dictionary and Thesaurus

    let counter = 0;

    $('#userT').on('click', () => {
        event.preventDefault();
        $('#thesaurus').empty();
        counter++
        let item = $('#userThes').val().trim().toLowerCase()
        let list = $('#thesaurus').css({ 'font-size': '16px' })
        $('#userThes').val('')
        list.append('<li id=thes_' + counter + '>' + item + '</li>').css({ 'padding-right': '0px', 'font-size': '16px', 'list-style': 'none', 'text-align': 'left' })
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
            $('#thes_' + counter).append(': ' + thes)

            //$('#synonym').text(thes.join(' , '))
            //$('#wordThes').append(' :synonyms')


        })
    })







})