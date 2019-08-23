var topics = ["cat", "dog", "rat", "hamster"];

var favList = [];

$("#button-container").on("click", ".gif-button", function () {
    $("#gif-container").empty();

    var term = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=EDLqgQRQ2EF7rzhHyY9utP3mRuRMF7h6&limit=10&q=" + term;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (res) {
            console.log(res);
            var results = res.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>")
                    .addClass("gif-div mr-2 mt-2 rounded");
                var img = $("<img>")
                    .addClass("gif")
                    .attr("src", results[i].images.fixed_height_still.url)
                    .attr("data-still", results[i].images.fixed_height_still.url)
                    .attr("data-gif", results[i].images.fixed_height.url)
                    .attr("data-state", "still")
                    .attr("alt", term + " img");
                var rating = $("<span>")
                    .text("Rating: " + results[i].rating);
                var fav = $("<button>")
                    .addClass("fav-button")
                    .text("Favorite!");
                gifDiv.append(rating);
                gifDiv.append(fav);
                gifDiv.append(img);
                $("#gif-container").append(gifDiv);
            }
        });
});

$("#gif-container").on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-gif"));
        $(this).attr("data-state", "gif");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#gif-container").on("click", ".fav-button", function () {
    event.preventDefault();

    var fav = $(this).next();
    favList.push(fav);

    favList.forEach(i => {
        $("#fav-gifs").append(i);
    });
    console.log(favList);
    //losses data when stringified for some reason
    localStorage.setItem("favList", JSON.stringify(favList));
});

$("#fav-gifs").on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-gif"));
        $(this).attr("data-state", "gif");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#button-submit").on("click", function () {
    if ($("#button-input").val().trim() === "") {
        return false;
    } else {
        topics.push($("#button-input").val().trim());
        $("#button-container").empty();
        topics.forEach(i => {
            var btn = $("<button>")
                .addClass("gif-button rounded")
                .text(i);
            $("#button-container").append(btn);
        })
        $("#button-input").val("");
    }
});

window.onload = function () {
    topics.forEach(i => {
        var btn = $("<button>")
            .addClass("gif-button rounded")
            .text(i);
        $("#button-container").append(btn);
    });
    favList = JSON.parse(localStorage.getItem("favList")) || [];
    favList.forEach(i => {
        console.log(i);
        $("#fav-gifs").append(i);
    });
};