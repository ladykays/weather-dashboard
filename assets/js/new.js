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
      var today = moment().format("DD/MM/YYYY"); // Get the current date using moment.js and store it in a variable called date
      console.log("Current Date: " + today);
      currentWeather();
      weatherForecast();

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

        // Create elements for displaying current weather data
        //====================================================== 
        var headingContainer = $("<div>")
          .addClass("heading-container")
          .prependTo(".current");
        today = $("<h2>")
          .addClass("today")
          .text("( " + today + " )"); 
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
        $(today).appendTo(headingContainer);
        $(weatherIconEl).appendTo(headingContainer);
        
        
        $(".current").append(tempEl);
        $(".current").append(humidityEl);
        $(".current").append(windSpeedEl);
      } // End of currentWeather function

      return response;

      // 5 Day Weather Function
      function weatherForecast() {
        var forecastAPIURL = "https://api.openweathermap.org/data/2.5/forecast?lat=";
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        console.log(lat, lon);
        var forecastQueryURL = forecastAPIURL + lat + "&lon=" + lon  + "&include=daily&cnt=5" + apiKey;
        console.log(forecastQueryURL);

        $.ajax({
          url: forecastQueryURL,
          method: "GET"
        }).then(function (forecastResponse) {
          console.log(forecastResponse);
            
          var title5DayEl = $("<h2>")
            .addClass("heading-5-day")
            .appendTo("#forecast")
            .text("5-Day Forecast");

          var forecastContainerEl = $("<div>")
            .addClass("forecast-container")
            .appendTo("#forecast");

          for (var i = 0; i < 5; i++) {
            // Multiply by 1000 because the timestamp in the list array is in seconds, and the Date constructor takes milliseconds
            // 
            var date = new Date(forecastResponse.list[i].dt * 1000).toLocaleDateString(); 
            console.log(date);

            // Create elements for displaying current weather data
            //====================================================== 
            
              //.appendTo("#forecast") 
              //.text("5-Day Forecast");

            var forecastData = $("<div>")
              .addClass("forecast-data")
              .appendTo(forecastContainerEl);

            var h4El = $("<h4>")
              .addClass("forecast-date")
              //.appendTo(forecastContainer)
              .text(date);

            var tempEl = $("<div>")
              .addClass("data-element")
              //.appendTo(forecastContainer);

            var windSpeedEl = $("<div>")
              .addClass("data-element");

            var humidityEl = $("<div>")
             .addClass("data-element");

            var iconEl = $("<img>")
             .addClass("forecast-icon");



            // Append the newly created elements to the DOM
            
            //title5DayEl.append(forecastContainer);
            forecastData.append(h4El, iconEl, tempEl, windSpeedEl, humidityEl);
            

            // Update the page with the newly created elements
            //====================================================== 
            var iconURL = "http://openweathermap.org/img/wn/" + forecastResponse.list[i].weather[0].icon + ".png"; // Weather icon URL
            var tempK = forecastResponse.list[i].main.temp;
            var tempC = (tempK - 273.15).toFixed(2); // Converts Kelvin to Celsius and rounds it to 2 decimal places
            console.log(tempK);
            console.log(tempC);
            var windSpeed = forecastResponse.list[i].wind.speed;
            var humidity = forecastResponse.list[i].main.humidity;

            title5DayEl.text("5-Day Forecast");
            iconEl.attr("src", iconURL);
            tempEl.text("Temp: " + tempC + " °C");
            windSpeedEl.text("Wind Speed: " + windSpeed + " mph");
            humidityEl.text("Humidity: " + humidity);
            



            //TODO: Get only time that atarts at midnight 00:00:00
          } // End of for loop
          
        }); // End of function forecastResponse

      } // End of weatherForecast function

    }); // End function response
  }); // End of click event function

  // Function to remove the weather data
  function clearWeather() {
  
}  
}); // End of document ready function