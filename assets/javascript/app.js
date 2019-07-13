$(document).ready(function (){
    
     $("#userD").on('click', function () {
            event.preventDefault()
            let userDefine = $('#userDefine').val().trim().toLowerCase()
            //Clearing whatever user typed
            $('#userDefine').val('')
            $('#definition').empty()
            let query = "https://dictionaryapi.com/api/v3/references/collegiate/json/"+userDefine+"?&key=badf0fb9-2111-4efc-99f2-e6ac5ada80bd"
       
        
    
    
    $.ajax({
        url:query,
        method: "GET"
    }).then(function (response){
        console.log(response)
        let def = response[0].shortdef.map(item => item )
        console.log(def)
       $("#definition").append('<h5>' + def.join(' ') + '</h5>')
    }) 
})
    $('#userT').on('click', function() {
        event.preventDefault()
        let userThes = $('#userThes').val().trim().toLowerCase()
        $('#userThes').val('')
        $('#thesaurus').empty()

        let query_2 = "https://dictionaryapi.com/api/v3/references/thesaurus/json/"+userThes+"?&key=16c11365-c317-4d39-aa7c-62632093e7ef"

        $.ajax({
            url: query_2,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            let thes = response[0].meta.syns[0].map(item => item)

            console.log(thes)

            $('#synonyms').append('<h5>' + thes.join(' , ') + '</h5>')


            
        })
    })
})