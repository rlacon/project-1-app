$(document).ready(function(){

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
    function getGenre(setting, plotOne, midPoint, climax, resolution) {
        
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
        'Climax: the tipping point of the story where the main character defeats the villain typically',
        'The resolution occurs when the villain dies or is defeated somehow, in which the main character\'s issues are solved. Tension is no longer present')
    let horror = new getGenre(
        'Think haunted mansion, cemetary, a lab where vile experiments are performed, small quiet towns, ghost towns',
        'The first act sets up the character or characters in question, usually something disturbing happens at some point to get the rest of the story going',
        'Tension building, confronting whatever supernatural entity or event has taken place, the characters should seem weak and vulnerable to whatever is happening',
        'Final confrontation with source of horror that occurs in the story',
        'Character could live or die, or some other strange or horrifying outcome, story could have a bleak ending or a happy one to ease the previous tension')
    let scifi = new getGenre(
        'Think of a derelict spaceship, laboratory, anywhere with science vibes', 
        'Character or characters are introduced, usually scientists, astronauts, explorers, roboticists',
        'Introduce a villain, mistake on the characters part that leads to an accident, AI going out of control etc',
        'Character deaths can occur at this point, or the final reveal of something previously unknown that is driving the action of the story',
        'Scifi stories tend to end in a variety of different ways, generally they have obscure endings where the ending is left up to the viewer\'s imagination')
    let mystery = new getGenre(
        'Think of a gathering among friends, law enforcement personell, a stranger who emerges suddenly from nowhere',
        'Introduction of either central character or several',
        'Event can occur at this point that is unexplainable, character\'s then seek to uncover the reason',
        'Tension comes to an end here with the reason for whatever events you decided to unleash comes to light',
        'Readers want to know what happened to the characters, or you could leave it murky and leave it up to them to decide.')
       
      
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
            $('#loop-info-5').text(values[4])
            
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