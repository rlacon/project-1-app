
var config = {
    apiKey: "AIzaSyBStdtgAvdOPQ8fczEWuM4ArfBIK_64rZo",
    authDomain: "writeunread.firebaseapp.com",
    databaseURL: "https://writeunread.firebaseio.com",
    projectId: "writeunread",
    storageBucket: "",
    messagingSenderId: "667609225561",
    appId: "1:667609225561:web:d35676707f2d51c6"
};

firebase.initializeApp(config);

//let database = firebase.database()

 
      


$(document).ready(function () {
    let counter  = 0;

    $("#userD").on('click', () => {
        counter++

        event.preventDefault()
        let item = $('#userDefine').val().trim().toLowerCase()
        

        let query = "https://dictionaryapi.com/api/v3/references/collegiate/json/" + item + "?&key=badf0fb9-2111-4efc-99f2-e6ac5ada80bd"
        //definethes
       

        let list = $('#definitions').css({'font-size' : '24px'})
        
        list.append('<li id=def_' +counter+'>' + item + '</li>').css({ 'border': '1px solid black', 'list-style': 'none', 'font-weight':'bold'})
        
        $('#userDefine').val('')
        
        //$('#definethes').append('<p class=border border-success id=definition><strong></strong></p>')
        //$('#definition').before('<h3 id=wordDef>' + userDefine + '</h3>')
       
        //$('#wordDef').remove(userDefine)
        //$('#wordDef').append('<h3 id=wordType></h3>')
        //$('#userDefine').val('')
        
        
       
        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response) {

            let def = response[0].shortdef.map(item => item)
            let type = response[0].fl
            $('#def_' + counter).append(': '+ def)
            console.log(def)
            console.log(type)
            //$('#wordType').replaceWith(' : ' + type)
            //$('#definition').text(def.join(' '))
        })
    })
    $('#userT').on('click', () => {
        event.preventDefault()
        let userThes = $('#userThes').val().trim().toLowerCase()
        
      //$('#definethes').append('<p class=border border-success id=synonym><strong></strong></p>')
      //$('#synonym').before('<h3 id=wordThes>' + userThes + '</h3>')
      //$('#userThes').val('')
      
        let query_2 = "https://dictionaryapi.com/api/v3/references/thesaurus/json/" + userThes + "?&key=16c11365-c317-4d39-aa7c-62632093e7ef"

        $.ajax({
            url: query_2,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            let thes = response[0].meta.syns[0].map(item => item)
            console.log(thes)
           
           
            //$('#synonym').text(thes.join(' , '))
            //$('#wordThes').append(' :synonyms')
            





        })
    })
})