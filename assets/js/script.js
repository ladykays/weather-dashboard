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

  


  // Build the URL for querying the weather API
  function buildQueryURL() {
    var city = $("#search-input")
      .val()
      .trim();
    var apiKey = "430a3842b09d883ae73a59e0c1d18fa2"
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&appid=" + apiKey; // use forecast endpoint instead of weather endpoint for a 5 day forcast. Also, add cnt=5 to get 5 day forecast
    return queryURL;   
  }
  console.log("Query URL: " + buildQueryURL());


  function updatePage(weatherData) {
    var date = moment().format("DD/MM/YYYY"); // Get the current date using moment.js and store it in a variable called date
    console.log("Current Date: " + date);

    // Assign weather data to variables
    var cityName = weatherData.city.name;
    var country = weatherData.city.country;
    var weatherIcon = weatherData.list[0].weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"; // Weather icon URL
    var tempK = weatherData.list[0].main.temp;
    var humidity = weatherData.list[0].main.humidity;
    var windSpeed = weatherData.list[0].wind.speed;

    // Create elements for displaying weather data
    //=============================================== 
    // Element for displaying the current date
    var headingContainer = $("<div>").addClass("heading-container").prependTo(".current");
    date = $("<h2>")
      .addClass("date")
      .text("( " + date + " )"); 
    cityName = $("<h2>").addClass("city-name").text(cityName); 
    country = $("<h2>").addClass("country").text(country);
    var weatherIconEl = $("<img>").addClass("weather-icon").attr("src", iconURL);
    var tempC = (tempK - 273.15).toFixed(2); // Convert Kelvin to Celsius
    var tempEl = $("<p>").addClass("temp").text("Temperature: " + tempC + " °C");
    var humidityEl = $("<p>").addClass("humidity").text("Humidity: " + humidity);
    var windSpeedEl = $("<p>").addClass("wind-speed").text("Wind Speed:  " + windSpeed + " mph");
    
    
    // Add the newly created elements to the DOM
    //$(".current-weather-container").prepend(headingContainer);
    $(cityName).appendTo(headingContainer);
    $(country).appendTo(headingContainer);
    $(date).appendTo(headingContainer);
    $(weatherIconEl).appendTo(headingContainer);
    
    
    $(".current").append(tempEl);
    $(".current").append(humidityEl);
    $(".current").append(windSpeedEl);


    // 5 day forcast
    //====================================
    var heading5DayEl = $("<h2>")
      .addClass("heading-5-day")
      .appendTo("#forecast") 
      .text("5-Day Forecast");

    var forecastContainer = $("<div>").addClass("forecast-container").appendTo("#forecast");

      for (var i = 0; i < 5; i++) {
        var day = weatherData.list[i].dt_txt
        var slicedDay = day.slice(0, 10);
        console.log(day);
        console.log(slicedDay);

        var forcastWeatherIcon = weatherData.list[i].weather[0].icon;
        var forcastIconURL = "http://openweathermap.org/img/wn/" + forcastWeatherIcon + "@2x.png";

        var tempK5Day = weatherData.list[i].main.temp;
        var humidity5Day = weatherData.list[i].main.humidity;
        var windSpeed5Day = weatherData.list[i].wind.speed;
        

        // Elements for displaying 5 day forcast
        var day1El = $("<div>").addClass("card forecastItem day-1");
        day1El.text(slicedDay);
        var weatherIconEl1 = $("<img>").addClass("weather-icon").attr("src", forcastIconURL);
        var tempC5Day = (tempK5Day - 273.15).toFixed(2); // Convert Kelvin to Celsius
        var tempC5DayEl1 = $("<p>").addClass("temp").text("Temperature: " + tempC5Day + " °C");
        var humidityEl1 = $("<p>").addClass("humidity").text("Humidity: " + humidity5Day);
        var windSpeedEl1 = $("<p>").addClass("wind-speed").text("Wind Speed: " + windSpeed5Day + " mph");

        var day2El = $("<div>").addClass("card forecastItem day-2");
        day2El.text(slicedDay);
        var weatherIconEl2 = $("<img>").addClass("weather-icon").attr("src", forcastIconURL);
        var tempC5DayEl2 = $("<p>").addClass("temp").text("Temperature: " + tempC5Day + " °C");
        var humidityEl2 = $("<p>").addClass("humidity").text("Humidity: " + humidity5Day);
        var windSpeedEl2 = $("<p>").addClass("wind-speed").text("Wind Speed: " + windSpeed5Day + " mph");

        var day3El = $("<div>").addClass("card forecastItem day-3");
        day3El.text(slicedDay);
        var weatherIconEl3 = $("<img>").addClass("weather-icon").attr("src", forcastIconURL);
        var tempC5DayEl3 = $("<p>").addClass("temp").text("Temperature: " + tempC5Day + " °C");
        var humidityEl3 = $("<p>").addClass("humidity").text("Humidity: " + humidity5Day);
        var windSpeedEl3 = $("<p>").addClass("wind-speed").text("Wind Speed: " + windSpeed5Day + " mph");

        var day4El = $("<div>").addClass("card forecastItem day-4");
        day4El.text(slicedDay);
        var weatherIconEl4 = $("<img>").addClass("weather-icon").attr("src", forcastIconURL);
        var tempC5DayEl4 = $("<p>").addClass("temp").text("Temperature: " + tempC5Day + " °C");
        var humidityEl4 = $("<p>").addClass("humidity").text("Humidity: " + humidity5Day);
        var windSpeedEl4 = $("<p>").addClass("wind-speed").text("Wind Speed: " + windSpeed5Day + " mph");

        var day5El = $("<div>").addClass("card forecastItem day-5");
        day5El.text(slicedDay);
        var weatherIconEl5 = $("<img>").addClass("weather-icon").attr("src", forcastIconURL);
        var tempC5DayEl5 = $("<p>").addClass("temp").text("Temperature: " + tempC5Day + " °C");
        var humidityEl5 = $("<p>").addClass("humidity").text("Humidity: " + humidity5Day);
        var windSpeedEl5 = $("<p>").addClass("wind-speed").text("Wind Speed: " + windSpeed5Day + " mph");
      }

    // Elements for displaying 5 day forcast
    //var day1El = $("<div>").addClass("card day-1");
    //day1El.text(slicedDay);
    
    
    

    // Add the newly created elements to the DOM
    forecastContainer.append(day1El, day2El, day3El, day4El, day5El);

    day1El.append(weatherIconEl1, tempC5DayEl1, humidityEl1, windSpeedEl1);
    day2El.append(weatherIconEl2, tempC5DayEl2, humidityEl2, windSpeedEl2);
    day3El.append(weatherIconEl3, tempC5DayEl3, humidityEl3, windSpeedEl3);
    day4El.append(weatherIconEl4, tempC5DayEl4, humidityEl4, windSpeedEl4);
    day5El.append(weatherIconEl5, tempC5DayEl5, humidityEl5, windSpeedEl5);
    

    // Assign weather data to variables
    //for (var i = 0; i < 5; i++) {
      
    //}
    
  }


  // Function to remove the weather data
  function clearWeather() {
    $(".date, .city-name, .country, .weather-icon, .temp, .humidity, .wind-speed").remove();
    $("day1El, day2El, day3El, day4El, day5El").remove();
    
  }


  // CLICK HANDLER
  //==============================
  // Search button event listener
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    clearWeather();
    
    var queryURL = buildQueryURL();
    // Make an AJAX call to the openweather API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
      
  });


}); // End of the document ready function