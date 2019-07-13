$(document).ready(function (){
    
    $.ajax({
        query:"https://dictionaryapi.com/api/v3/references/collegiate/json/test?q=headword&key=badf0fb9-2111-4efc-99f2-e6ac5ada80bd",
        method: "GET"
    }).then(function (response){
        console.log(response)
    })
})