$(document).ready(function() {

    //https://developers.zomato.com/documentation

    var submitButton = $("#submit");
    var inputField = $("#input");

    var userInput = "";

    var zomatoAPIKey = "e9a701115b6afc966a7343268747292a";

    // when the submit button is clicked...
    submitButton.on("click", function(event) {
        event.preventDefault();

        /*--------------------------------------------------RESTAURANT API CALLS/*--------------------------------------------------*/

        // generate the API URL based on user input
        userInput = inputField.val().trim();
        var formattedInput = userInput.replace(" ", "%20");
        var apiLocationURL = "https://developers.zomato.com/api/v2.1/locations?query=" + formattedInput;
        
        // ajax call to the locations endpoint
        $.ajax({
            url: apiLocationURL,
            method: "GET",
            headers: {
                "user-key": zomatoAPIKey
            }
        }).then(function(data) {

            // log the response
            console.log(data);

            var locationID = data.location_suggestions[0].entity_id;

            // generate the API URL based on previous API response
            var apiTrendingFoodURL = "https://developers.zomato.com/api/v2.1/search?entity_type=city&count=5&entity_id=" + locationID;

            // ajax call to the search endpoint
            $.ajax({
                url: apiTrendingFoodURL,
                method: "GET",
                headers: {
                    "user-key": zomatoAPIKey
                }
            }).then(function(data) {

                // log the response
                console.log(data);

                var restaurants = data.restaurants;

                var cityRestaurantsDiv = $("<div>");

                // loop through the restaurants array
                for(var i = 0; i < restaurants.length; i++) {
                    
                    // gets the individual restaurant's data
                    var r = restaurants[i].restaurant;
                    var name = r.name;
                    var cuisine = r.cuisines;
                    var rating = r.user_rating.aggregate_rating;
                    var pricing = r.price_range;
                    var price = "";
                    var menu = r.menu_url;

                    // convert price integer to dollar signs
                    for(var j = 0; j < parseInt(pricing); j++) {
                        price += "$";
                    }

                    // create a new div to store the data, append everything
                    var newDiv = $("<div>");
                    newDiv.append($("<p>").text("Name: " + name));
                    newDiv.append($("<p>").text("Cuisine: " + cuisine));
                    newDiv.append($("<p>").text("Rating: " + rating));
                    newDiv.append($("<p>").text("Price: " + price));
                    newDiv.append($("<a>").attr("href", menu).text("Menu"));

                    // appends the new div to the existing "trending" div
                    cityRestaurantsDiv.append(newDiv);
                    cityRestaurantsDiv.append($("<hr>"));
                }

                $("#trending").prepend(cityRestaurantsDiv);

            });

        });


        /*--------------------------------------------------WEATHER API CALLS--------------------------------------------------*/
        // set the city to search as the userInput from above
        var city = userInput;

        // if the search query is not blank
        if (city != "") {

            // ajax call to the weather endpoint
            $.ajax({
            url:
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=imperial" +
                "&APPID=cc156a7293c1db3e8a1d6e4695a28978",
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
                var widget = show(data);

                // displays the weather data
                $("#show").html(widget);
                // clears the userInput box
                $("#input").val("");
            }
            });
        } else {
            $("#error").html("Field cannot be empty");
        }

    });
    
});

// function to create the HTML that displays the weather data
function show(data) {
 return (
   "<h2>Current Weather for " +
   data.name +
   ", " +
   data.sys.country +
   " </h2>" +
   ("<h3><strong>Weather</strong>: " +
     data.weather[0].main +
     "</h3>" +
     "<h3><strong>Description</strong>: " +
     data.weather[0].description +
     "</h3>" +
     "<h3><strong>Temperature</strong>: " +
     data.main.temp +
     "</h3>" +
     "<h3><strong>Pressure</strong>: " +
     data.main.pressure +
     "</h3>" +
     "<h3><strong>Humidity</strong>: " +
     data.main.humidity +
     "</h3>" +
     "<h3><strong>Low Temperature</strong>: " +
     data.main.temp_min +
     "</h3>" +
     "<h3><strong>High Temperature</strong>: " +
     data.main.temp_max +
     "</h3>" +
     "<h3><strong>Wind Speed</strong>: " +
     data.wind.speed +
     "</h3>" +
     "<h3><strong>Wind Direction</strong>: " +
     data.wind.deg +
     "</h3>")
 );
}
