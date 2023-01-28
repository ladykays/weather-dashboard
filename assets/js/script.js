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
  date = $("<h2>")
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
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&appid=" + apiKey; // use forecast endpoint instead of weather endpoint for a 5 day forcast. Also, add cnt=5 to get 5 day forecast


    // Make an AJAX call to the openweather API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log("Weather Information: " + response);
      console.log(queryURL);
      console.log(response);
      //$(".current").text(JSON.stringify(response));

      
      //Display the weather data for the current date on the page.
      var cityName = response.city.name;
      cityName = $("<h2>").addClass("city-name").text(cityName); 
      console.log("City: " + cityName);

      $(".city-name").empty(); // Empty the city name element
      $(".current").prepend(cityName);  // Prepending after emptying the element will ensure that only one city name is displayed at a time


      // Get weather icon and display it on the page
      var weatherIcon = response.list[0].weather[0].icon;
      var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      console.log(iconURL);
      var weatherIconEl = $("<img>").addClass("weather-icon").attr("src", iconURL);

      $(".weather-icon").remove();
      //$(".current").empty(); 
      // TODO: Try to use the commented out code above to remove every element from the div 
      // TODO: Try to change the color of the weather icon
      $(".current").append(weatherIconEl);

      
      // Get the temperature and display it on the page
      var tempK = response.list[0].main.temp;
      var tempC = (tempK - 273.15).toFixed(2);
      var tempEl = $("<p>").addClass("temp").text("Temperature: " + tempC + " °C");

      $(".temp").remove(); // Empty the temp element
      $(".current").append(tempEl);

       // Get the humidity and display it on the page
      var humidity = response.list[0].main.humidity;
      var humidityEl = $("<p>").addClass("humidity").text("Humidity: " + humidity);

      $(".humidity").remove(); // Empty the humidity element
      $(".current").append(humidityEl); 

      //Get the wind speed and display it on the page
      var windSpeed = response.list[0].wind.speed;
      var windSpeedEl = $("<p>").addClass("wind-speed").text("Wind Speed: wind" + windSpeed + " mph");

      $(".wind-speed").remove(); // Empty the wind speed element
      $(".current").append(windSpeedEl);
      console.log(windSpeed);

    });
    console.log(queryURL);

  
      



      
  });


}); // End of the document ready function