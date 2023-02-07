$(document).ready(function () { // Instructs the browser to only load script file after loading the html

  var apiKey = "&appid=430a3842b09d883ae73a59e0c1d18fa2";
  var city = "London";
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";

  // Build the URL for querying the weather API
  function buildQueryURL() {
    var queryURL = apiURL + city + apiKey;
    return queryURL;   
  }
  console.log("Query URL: " + buildQueryURL());

  // CLICK HANDLER
  //==============================
  // Search button event listener
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    //clearWeather();
    $("#today").empty();
    city = $("#search-input").val(); // Updates the value of the search input
    searchHistory();
    queryURL = buildQueryURL();
    // Make an AJAX call to the openweather API to get the current weather
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var today = moment().format("DD/MM/YYYY"); // Get the current date using moment.js and store it in a variable called "today"
      console.log("Current Date: " + today);
      currentWeather();
      weatherForecast();

      // Function to display current weather
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
        headingContainer.append(cityName, country, today, weatherIconEl);
        $(".current").append(tempEl, humidityEl, windSpeedEl);
        
      } // end currentWeather function

      //return response;

      // Function for 5-day weather forecast
      function weatherForecast() {
        var forecastAPIURL = "https://api.openweathermap.org/data/2.5/forecast?lat=";
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        console.log(lat, lon);
        //var forecastQueryURL = forecastAPIURL + lat + "&lon=" + lon  + "&include=daily&cnt=5" + apiKey;
        var forecastQueryURL = forecastAPIURL + lat + "&lon=" + lon  + "&include=daily" + apiKey; // removed "&cnt=5" so all data is returned
        console.log(forecastQueryURL);

        $.ajax({
          url: forecastQueryURL,
          method: "GET"
        }).then(function (forecastResponse) {
          console.log(forecastResponse);
            
          

          // Only get the dt_txt of "00:00:00" timestamp
          /* for (var i = 0; i < forecastResponse.list.length; i++) {
            if (forecastResponse.list[i].dt_txt.indexOf("00:00:00") !== -1) {
              
              var date = new Date(forecastResponse.list[i].dt_txt * 1000).toLocaleDateString(); 
              console.log(date); 

              var forecastData = $("<div>")
              .addClass("forecast-data")
              .appendTo(forecastContainerEl);

              var h4El = $("<h4>")
              .addClass("forecast-date")
              //.appendTo(forecastContainer)
              .text(date); 

              forecastContainerEl.append(h4El);
              
            }
            
          } */

          var title5DayEl = $("<h2>")
            .addClass("heading-5-day")
            .text("5-Day Forecast");

          var forecastContainerEl = $("<div>")
            .addClass("forecast-container");

          $("#forecast").append(title5DayEl, forecastContainerEl);
          for (var i = 0; i < 5; i++) {
            // Multiply by 1000 to convert the Unix timestamp in seconds to miliseconds
            //var date = new Date(forecastResponse.list[i].dt * 1000).toLocaleDateString(); 
            var date = new Date((forecastResponse.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            console.log(date);  

            //var date = document.getElementsByClassName("forecast-date" + (i + 1)).innerHTML = weekDay[checkDay(i)];
            //var date = weekDay[checkDay(i)];
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

            var humidityEl = $("<div>")
             .addClass("data-element");

            var iconEl = $("<img>")
             .addClass("forecast-icon");



            // Append the newly created elements to the DOM
            
            //title5DayEl.append(forecastContainer);
            forecastData.append(h4El, iconEl, tempEl, humidityEl);
            

            // Update the page with the newly created elements
            //====================================================== 
            var iconURL = "http://openweathermap.org/img/wn/" + forecastResponse.list[i].weather[0].icon + ".png"; // Weather icon URL
            var tempK = forecastResponse.list[i].main.temp;
            var tempC = (tempK - 273.15).toFixed(2); // Converts Kelvin to Celsius and rounds it to 2 decimal places
            console.log(tempK);
            console.log(tempC);
            var humidity = forecastResponse.list[i].main.humidity;

            title5DayEl.text("5-Day Forecast");
            iconEl.attr("src", iconURL);
            tempEl.text("Temp: " + tempC + " °C");
            humidityEl.text("Humidity: " + humidity);
            

            //TODO: Get only time that atarts at midnight 00:00:00
          } // End of for loop
          
        }); // End of function forecastResponse
        
        /* // Function to check for day 
        var d = new Date();
        var weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        function checkDay(day) {
          if (day + d.getDay() > 6) {
            return day + d.getDay() - 7;
          } else {
            return day + d.getDay();
          }
        } // end function checkDay */

      } // End of weatherForecast function

    }); // End function response
  }); // End of click event function

  // Search history function
  function searchHistory() {
    var cityName = $("#search-input").val();
    var cities = [];
    //cityName.toUpperCase();
    
    
    // Create and append elements for saved search history
    /* var historyContainerEl = $("<div>")
      .addClass("history-container")
      .appendTo("#list-group"); */

    var ulEl = $("<ul>").addClass("history-list-group")
    .appendTo("#history");

    var liEl = $("<li>");
      
      

    // Add city to history list
    var citiesList = cities.length;
    cities.push(cityName);
    localStorage.setItem(cityName, cities);
    //cities = JSON.parse(localStorage.getItem("cities"));
    console.log(cities);
    cities.forEach(function (cityName) {
      liEl.addClass("list-group-item").text(cityName).appendTo(ulEl);
    }); 
    /* for (var i = 0; i < cities.length; i++) {
      liEl.addClass("list-group-item").text(cityName).appendTo(ulEl);
    } */
    
      
    
  } // End of saveHistory function
  searchHistory();
  // Function to remove the weather data
  function clearWeather() {

  
  } // End of function clearWeather
}); // End of document ready function