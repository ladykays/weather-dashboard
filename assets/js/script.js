$(document).ready(function () { // Instructs the browser to only load script file after loading the html

  /* 
    * Create a functionality to get the date and time using moment.js

    * Add URL for the weather API

    * Call the JASON function for the weather data

    * Display the weather data for the current date on the page. The weather data should include:
    
    * When a user enters a city in the search bar: 

      * Display the weather data for the current date on the page. The weather data should include:
        - The city name
        - The date
        - An icon representation of the weather conditions
        - The temperature
        - The humidity
        - The wind speed

      * Display the weather data for the next 5 days on the page. The weather data should include:
        - The date
        - Icon representation of the weather conditions
        - The temperature
        - The humidity

    * When a user clicks on a city in the search history, display the weather data for that city on the page. 

  */

  // Create a functionality to get the date and time using moment.js
  var date = moment().format("DD/MM/YYYY");
  console.log("Current Date: " + date);

  // Create a div for displaying the current date and append it to the page
  date = $("<div>")
    .addClass("date").text("( " + date + " )");
  $(".current").append(date);




  // Search button event listener
  $("button").on("click", function (event) {
    event.preventDefault();
    var city = $("#search-input")
      .val()
      .trim();
    var apiKey = "430a3842b09d883ae73a59e0c1d18fa2"

    // Build the URL for querying the weather API
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;


    // Make an AJAX call to the openweather API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log("Weather Information: " + response);
      console.log(queryURL);
      console.log(city);
    });
    console.log(queryURL);

    // Create a div for displaying the city name and append it to the page
      var cityName = $("<div>")
      .addClass("city-name").text(city); 
      console.log("City: " + cityName);
      $(".city-name").empty(); // Empty the city name div
      $(".current").prepend(cityName);  // Prepending after emptying the div will ensure that only one city name is displayed at a time
  });


}); // End of the document ready function