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
      data();

      function data() {
        // Assign weather data to variables
        var cityName = response.name;
        var country = response.country;
        var weatherIcon = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"; // Weather icon URL
        var tempK = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;

        console.log(cityName, country, weatherIcon, iconURL, tempK, humidity, windSpeed);
      } // End of data function
    }); // End function response
  }); // End search button event listener

// Function to remove the weather data
function clearWeather() {
  
}  
}); // End of document ready function