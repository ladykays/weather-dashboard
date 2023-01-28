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
date = $("<div>")
  .addClass("date").text("( " + date + " )");
$(".current").append(date);