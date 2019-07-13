$(document).ready(function (){
    
     $("#usersubmit").on('click', function () {
            event.preventDefault()
            let userSearch = $('#usersearch').val().trim().toLowerCase()
            //Clearing whatever user typed
            $('#usersearch').val('')

            let query = "http://dictionaryapi.com/api/v3/references/collegiate/json/"+userSearch+"?&key=badf0fb9-2111-4efc-99f2-e6ac5ada80bd"
       
        
    
    
    $.ajax({
        url:query,
        method: "GET"
    }).then(function (response){
        console.log(response)
        let def = response[0].shortdef.map(item => item )
        console.log(def)
       $("#definition").append('<h5>' + def + '</h5>')
    }) 
})
})