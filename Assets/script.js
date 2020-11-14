const key = "&appid=97e0dba8d4f54a01999bb446a04a3ad3";
var searchedCities = [];


$(document).ready(function () {
  $("#start-search").on("click", function (event) {
    event.preventDefault();
    pushToLarge();
    addCityToList();
    function pushToLarge() {
      var city = $("#city-form").val().trim();
      searchedCities.push(city);
      console.log(searchedCities);

      let queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + key;
      counter = 0;

      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        $("#city").text(response.name);
        var temperature = (response.main.temp - 273.15) * 1.8 + 32;
        temperature = Math.floor(temperature);
        $("#temperature").text("Temp: " + temperature);
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windspeed").text("Wind Speed: " + response.wind.speed + "MPH");
        $("#UV-index").text("UV Index:" + response);
      });

      console.log(counter);
    }
  });
  function addCityToList() {
    var city = $("#city-form").val().trim();
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + key,
      method: "GET",
    }).then(function (response) {
      $("#forecast-five-day").empty();
      console.log(response);
      console.log(response.dt);
      let results = response.list;
      console.log(results);
      for (let i = 0; i < results.length; i++) {
        let day = Number(results[i].dt_txt.split("-")[2].split(" ")[0]);
        let hour = results[i].dt_txt.split("-")[2].split("")[1];
        console.log(day);
        console.log(hour);
        if (results[i].dt_txt.indexOf("12:00:00") !== -1) {
          let temperature = (results[i].main.temp - 273.15) * 1.8 + 32;
          let temperatureinFarenhight = Math.floor(temperature);

          let card = $("<div>").addClass(
            "card col-md-2 ml-4 bg-primary text-white"
          );
          let cardInner = $("<div>").addClass("card-body p-2 forecastInner");

          
          let temp = $("<p>")
            .addClass("card-text for-temp")
            .text("temperature: " + temperatureinFarenhight);
          let humidity = $("<p>")
            .addClass("card-text humidity")
            .text("Humidity:" + results[i].main.humidity + "%");
          let image = $("<img>").attr(
            "src",
            "https://openweathermap.org/img/w" +
              results[i].weather[0].icon +
              ".png"
          );

          cardInner.append(image, temp, humidity);
          card.append(cardInner);
          $("#forecast-five-day").append(card);
        }
      }
    });

    $("#saved-citys").empty();
    for (var i = -1; i < searchedCities.length; i++) {
      var a = $("<div>");
      a.addClass("saved-citys text-white");
      a.attr("city-name", searchedCities[i]);
      a.text(searchedCities[i]);
      $("#saved-citys").append(a);
      localStorage.setItem("cities", searchedCities)

    }
  }
});
