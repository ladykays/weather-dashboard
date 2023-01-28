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
    var weatherIcon = weatherData.list[0].weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"; // Weather icon URL
    var tempK = weatherData.list[0].main.temp;
    var humidity = weatherData.list[0].main.humidity;
    var windSpeed = weatherData.list[0].wind.speed;

    // Create elements for displaying weather data
    //=============================================== 
    // Element for displaying the current date
    date = $("<h2>")
      .addClass("date")
      .text("( " + date + " )"); 
    cityName = $("<h2>").addClass("city-name").text(cityName); 
    var weatherIconEl = $("<img>").addClass("weather-icon").attr("src", iconURL);
    var tempC = (tempK - 273.15).toFixed(2); // Convert Kelvin to Celsius
    var tempEl = $("<p>").addClass("temp").text("Temperature: " + tempC + " °C");
    var humidityEl = $("<p>").addClass("humidity").text("Humidity: " + humidity);
    var windSpeedEl = $("<p>").addClass("wind-speed").text("Wind Speed:  " + windSpeed + " mph");

    // Add the newly created elements to the DOM
    $(".current").append(date);
    $(".current").prepend(cityName);  // Prepending after emptying the element will ensure that only one city name is displayed at a time
    $(".current").append(weatherIconEl);
    $(".current").append(tempEl);
    $(".current").append(humidityEl);
    $(".current").append(windSpeedEl);
    
  }


  // Function to remove the weather data
  function clearWeather() {
    $(".date").remove();
    $(".city-name").remove();
    $(".weather-icon").remove();
    $(".temp").remove();
    $(".humidity").remove();
    $(".wind-speed").remove();
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