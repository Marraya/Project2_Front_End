var buttonsPool = ["fights", "muaythai", "anime", "jiujitsu", "ufc", "boxing"];

renderButtons(); // Initial button load

function renderButtons() {

    $("#button-wrapper").empty();

    for (var j = 0; j < buttonsPool.length; j++) {

        var newButton = $("<button>"); // Creates new button div, adds class, adds attribute & text
        newButton.addClass("gif-btn");
        newButton.attr("data-name", buttonsPool[j]);
        newButton.text(buttonsPool[j]);

        $("#button-wrapper").append(newButton)
    }
}

$("#add-gif").on("click", function (event) {

    event.preventDefault();
    var newGif = $("#gif-input").val().trim().toLowerCase(); // Captures user input
    buttonsPool.push(newGif); // Adds new user input as a button to the array
    renderButtons(); // Rolls out new buttons without duplicates

});

$(document).on("click", ".gif-btn", showGifResults); // Populates 10 Gif's based on user choice

function showGifResults() {

    var APIKey = "pJhVg5IgRa68h59of8TeEpsaz0Zii7N2";
    var searchParameters = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?" + "q=" + searchParameters + "&api_key=" + APIKey + "&limit=10"

    $("#sub-wrapper").empty(); // Ensures a clear wrapper

    $.ajax({ // AJAX call for our gifs!
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (var i = 0; i < response.data.length; i++) {

            var imgURL = response.data[i].images.original_still.url;

            var gifOuter = $("<div>");
            gifOuter.attr("id", "GIF" + i);
            gifOuter.addClass("gif-holder-outer");
            $("#sub-wrapper").append(gifOuter);

            var renderGif = $("<img>");

            renderGif.attr("src", imgURL);
            renderGif.addClass("gif-holder");

            renderGif.attr("data-name", response.data[i].id); // sets 'unique' ID
            renderGif.attr("data-clicked", "not-clicked"); // sets the internal 'not clicked' attribute
            renderGif.attr("data-internal", [i]); // sets internal value = to response array position

            $("#sub-wrapper").append(renderGif);
            $("#GIF" + i).append('<div class="ratings">' + response.data[i].rating + '</div>');
        }

        $(document).on("click", ".gif-holder", function (event) {

            event.preventDefault();

            console.log(response);
            console.log(queryURL)
            console.log(response.data)

            var internalID = $(this).attr("data-internal") // captures internal (array position) and establishes it the new image URL below
            var newImgURL = response.data[internalID].images.original.url

            console.log(internalID);
            console.log(newImgURL);

            if ($(this).attr('data-clicked') == 'not-clicked') {

                $(this).attr("src", newImgURL);
                $(this).attr("data-clicked", "clicked"); // desperate attempt at using an internal flag to handle click status, 
                // every 'other' gif button response/call actually stops & starts the GIF as intended. Why? No idea!

            } else if ($(this).attr('data-clicked') == 'clicked') {

                newImgURL = response.data[internalID].images.original_still.url
                console.log(newImgURL);

                $(this).attr("src", newImgURL);
                $(this).attr("data-clicked", "not-clicked");
            }
        });
    });


}