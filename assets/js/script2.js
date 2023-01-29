$(document).ready(function () { // Instructs the browser to only load script file after loading the html

  var apiKey = "&appid=430a3842b09d883ae73a59e0c1d18fa2";
  var city = "London";
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  var units = "&units=imperial";
  var weather;
  var input;

  // Event listener for the search button
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    city = $("#search-input").val();
    getData(city);
    console.log(city);
  });

  /* function setup() {
    var button = $("#search-button");
    button.on("click", getWeather);

    input = $("#search-input").val();
    //console.log(input);
  } */

  function getData() {
    var queryURL = apiURL + city + apiKey + units;
    $.ajax({
      url: queryURL,
      method: "GET"
      }).then(gotData);
      console.log(queryURL);
      //console.log(weather);
  }

  function gotData(data) {
    weather = data;
    console.log(data);
  }

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

  }); // End of document ready