$(document).ready(function () { // Instructs the browser to only load script file after loading the html

  var apiKey = "&appid=430a3842b09d883ae73a59e0c1d18fa2";
  var city = "London";
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  var units = "&units=imperial";

  // Build the URL for querying the weather API
  function buildQueryURL() {
    var queryURL = apiURL + city + apiKey + units;
    return queryURL;   
  }
  console.log("Query URL: " + buildQueryURL());

  // CLICK HANDLER
  //==============================
  // Search button event listener
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    clearWeather();
    city = $("#search-input").val(); // Updates the value of the search input
    queryURL = buildQueryURL();
    // Make an AJAX call to the openweather API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var date = moment().format("DD/MM/YYYY"); // Get the current date using moment.js and store it in a variable called date
      console.log("Current Date: " + date);
      currentWeather();

      function currentWeather() {
        // Assign weather data to variables
        var cityName = response.name;
        var country = response.sys.country;
        var currentWeatherIcon = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png"; // Weather icon URL
        var tempK = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;

        console.log(cityName, country, currentWeatherIcon, iconURL, tempK, humidity, windSpeed);

        // Create elements for displaying weather data
        //=============================================== 
        // Element for displaying the current date
        var headingContainer = $("<div>")
          .addClass("heading-container")
          .prependTo(".current");
        date = $("<h2>")
          .addClass("date")
          .text("( " + date + " )"); 
        cityName = $("<h2>")
          .addClass("city-name")
          .text(cityName); 
        country = $("<h2>")
          .addClass("country")
          .text(country);
        var weatherIconEl = $("<img>")
          .addClass("weather-icon")
          .attr("src", iconURL);
        var tempC = (tempK - 273.15).toFixed(2); // Convert Kelvin to Celsius
        var tempEl = $("<p>")
          .addClass("temp")
          .text("Temperature: " + tempC + " °C");
        var humidityEl = $("<p>")
          .addClass("humidity")
          .text("Humidity: " + humidity);
        var windSpeedEl = $("<p>")
          .addClass("wind-speed")
          .text("Wind Speed:  " + windSpeed + " mph")

        // Add the newly created elements to the DOM
        //$(".current-weather-container").prepend(headingContainer);
        $(cityName).appendTo(headingContainer);
        $(country).appendTo(headingContainer);
        $(date).appendTo(headingContainer);
        $(weatherIconEl).appendTo(headingContainer);
        
        
        $(".current").append(tempEl);
        $(".current").append(humidityEl);
        $(".current").append(windSpeedEl);
      } // End of currentWeather function

      // 5 Day Weather Function
      function weatherForecast() {
        
      } // End of weatherForecast function

    }); // End function response
  }); // End of click event function

// Function to remove the weather data
function clearWeather() {
  
}  
}); // End of document ready function