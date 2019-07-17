



// $(document).ready(function () {
//     //$('#start').on('click')

//     var queryURL = "https://favqs.com/api/qotd";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);
//         console.log(response.quote.body);

//         var quotes = $("<h2>").text(response.quote.body);

//         $("#quoteSection").empty();
//         $("#quoteSection").append(quotes);
//     });

//     $("#quotes-btn").on("click", function (event) {
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         }).then(function (response) {
//             console.log(response);
//             console.log(response.quote.body);

//             var quotes = $("<h2>").text(response.quote.body);

//             $("#quoteSection").empty();
//             $("#quoteSection").append(quotes);
//         });

//     })
// })