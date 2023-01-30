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
}); // End of document ready function