$(document).ready(function () { 
  var apiKey = "&appid=430a3842b09d883ae73a59e0c1d18fa2";
  var city = "London";
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";

  // Build the URL for querying the weather API
  //===============================================
  function buildQueryURL() {
    var queryURL = apiURL + city + apiKey;
    return queryURL;   
  }
  console.log("Query URL: " + buildQueryURL());


  // Function to get weather data from openweather API
  //====================================================
  function getWeatherData() {  
    queryURL = buildQueryURL();
    // Make an AJAX call to the openweather API to get the current weather
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var today = moment().format("DD/MM/YYYY"); // Get the current date using moment.js and store it in a variable called "today"
      console.log("Current Date: " + today);
      getCurrentWeather();
      getWeatherForecast();

      // Function to display current weather
      function getCurrentWeather() {
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
        $(".current").append(tempEl, windSpeedEl,  humidityEl,);
        
      } // end getCurrentWeather function


      // Function for 5-day weather forecast
      function getWeatherForecast() {
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
            

          var title5DayEl = $("<h2>")
            .addClass("heading-5-day")
            .text("5-Day Forecast");

          var forecastContainerEl = $("<div>")
            .addClass("forecast-container");

          $("#forecast").append(title5DayEl, forecastContainerEl);
          for (var i = 0; i < 5; i++) {
            // Multiply by 1000 to convert the Unix timestamp in seconds to miliseconds
            var date = new Date((forecastResponse.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            console.log(date);  

            // Create elements for displaying current weather data
            //====================================================== 
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
            

          } // end of for loop
          
        }); // end of forecastResponse function 

      } // end of getWeatherForecast function
    }); // end of response function 

  } // end of getWeatherData function
  
  // Search history
  //===============================

  // Function to add city to search history on the page
  function displaySearchHistory(city) {
    // Check if the city already exists on the page
    if ($("li[data-name='" + city + "']").length == 0) {
      var liEl = $("<li>");
      liEl.addClass("list-group-item searched-city").text(city);
      liEl.attr("data-name", city);
      $("ul").prepend(liEl);
    }
  }


  // Function to get cities from local storage
  function getSearchHistory() {
    if (localStorage.getItem("cities") == null) {
      cities = [];
    } else {
      cities = JSON.parse(localStorage.getItem("cities"));
    }
  }

  // Function to set local storage
  function setSearchHistory() {
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  // Function to save city to history
  function saveHistory(city) {
    // Get cities from local storage
    getSearchHistory();
    
    // Check if the city already exists in the local storage array
    if (!cities.includes(city)) {
      // Add city to local storage array
      cities.push(city);
      
      // Set local storage
      setSearchHistory();
      
      // Display the city on the page
      displaySearchHistory(city);
    }
  }

  // On page load, get the search history from local storage
  $(document).ready(function() {
    getSearchHistory();
    // Display the search history on the page
    cities.forEach(function(city) {
      displaySearchHistory(city);
    });
  });


  // CLICK HANDLERS
  //==============================
  // Search button event listener
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    $("#today").empty();
    $("#forecast").empty();
    city = $("#search-input").val(); // Updates the value of the search input
    getWeatherData();
    saveHistory(city);
    displaySearchHistory(city)
  }); 

  // Click handler to clear form when user clicks in the search field
  $("#search-input").on("click", function () {
    $(this).val("");
  });

  // Event handler for tapping the enter button on the keyboard
  $("#search-input").on("keydown", function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      //event.keyCode is depreciated. Left here to support older browsers
      event.preventDefault();
      $("#search-button").click();
    }
  });


  // Event listener for a click on any search history
  $(document).on("click", ".list-group-item", function() {
    $("#today").empty();
    $("#forecast").empty(); 
    $("#search-input").val("");
    city = $(this).attr("data-name");
    getWeatherData();
  }); 

  // Event listener for a click on delete history
  $("#delete-history").on("click", function() {
    $(".searched-city").remove(); // removes the list of cities from the page
    localStorage.clear(); // clears localStorage

  });


}); // end of the document ready function