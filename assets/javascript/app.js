
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

    $("#userD").on('click', function () {
        event.preventDefault()
        let userDefine = $('#userDefine').val().trim().toLowerCase()


        let query = "https://dictionaryapi.com/api/v3/references/collegiate/json/" + userDefine + "?&key=badf0fb9-2111-4efc-99f2-e6ac5ada80bd"
      
        $('#definethes').append('<p class=border border-success id=definition><strong></strong></p>')
        $('#definition').before('<h3 id=wordDef>' + userDefine + '</h3>')
       
        $('#wordDef').text(userDefine)
        $('#userDefine').val('')
        
        


        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response) {

            let def = response[0].shortdef.map(item => item)
            let type = response[0].fl
            console.log(def)
            $('#wordDef').append(' : ' + type)
            $('#definition').text(def.join(' '))
        })
    })
    $('#userT').on('click', function () {
        event.preventDefault()
        let userThes = $('#userThes').val().trim().toLowerCase()
        
        $('#definethes').append('<p class=border border-success id=synonym><strong></strong></p>')
        $('#synonym').before('<h3 id=wordThes>' + userThes + '</h3>')
        $('#userThes').val('')
      
        let query_2 = "https://dictionaryapi.com/api/v3/references/thesaurus/json/" + userThes + "?&key=16c11365-c317-4d39-aa7c-62632093e7ef"

        $.ajax({
            url: query_2,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            let thes = response[0].meta.syns[0].map(item => item)

           
           
            $('#synonym').text(thes.join(' , '))
            $('#wordThes').append(' :synonyms')
            





        })
    })
})