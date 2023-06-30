var city = "";
var url = "";
var APIkey = "";
var queryurl = "";
var currentUrl = "";
var cities = document.getElementById("searched_cities_contianer");
var cities = [];
init();
listClicker();
searchClicker();

function init(){
    var saved_history = JSON.parse(localStorage.getItem("cities"));
    if (saved_history !== null){
        cities = saved_cities
    }
    renderButtons();
}

function storeCities(){
    localStorage.setItem("cities", JSON.stringify(cities));
}

function renderButtons(){
    citiesDiv.innerHTML = [];
    if(cities == null){
        return;
    }
    var unique_cities = [new set(cities)];
    for(var i = 0; i < unique_cities.length; i++){
        var cityName = unique_cities[i];
        var buttonEl = document.createElement("button");
        buttonEl.textContent = cityName;
        buttonEl.setAttribute("class", "listbtn");
        citiesDiv.appendChild(buttonEl);
        listClicker();
    }
}

function listClicker(){
    $(".listbtn").on("click", function(event){
        event.preventDefault();
        city = $(this).text().trim();
        APIcalls();
    })
}

function searchClicker(){
    $("#searchbtn").on("click", function(event){
        event.preventDefault();
        city = $(this).prev().val().trim();

        cities.push(city);
        if(cities.length > 6){
            cities.shift()
        }
        if(city == ""){
            return;
        }
        APIcalls();
        storeCities();
        renderButtons();
})
}

function APIcalls(){

    url = "https://api.openweathermap.org/data/2.5/forecast?q=";
    currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    APIkey = "f115467d5bc5ff3fdd8e734aafaa3e8a";
    queryurl = url + city + APIkey;
    current_weather_url = currentUrl + city + APIkey;

    $("#name_of_city").text("Weather in" + city);
    $.ajax({
        url: queryurl,
        method: "GET",
    }).then(function(response){
        var day_number = 0;

        for(var i = 0; i < response.list.length; i++){
            if(response.list[i].dt_txt.split(" ")[1] == "15:00:00")
            {
                var day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                var month = response.list[i].dt_txt.split("-")[1];
                var year = response.list[i].dt_txt.split("-")[0];
                $("#" + day_number + "date").text(month + "/" + day + "/" + year);
                var temp = Math.round(((response.list[i].main.temp - 273.15) *9/5+32));
                $("#" + day_number + "Tempurature").text("Temp:" + temp + String.fromCharCode(176)+"f");
                $("#" + day_number + "Humidity").text("Humidity:" + response.list[i].main.humidity);
                $("#" + day_number + "five_day_icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                console.log(response.list[i].dt_txt.split("-"));
                console.log(day_number);
                console.log(response.list[i].main.temp);
                day_number++;
            }
        }
    });
}

$.ajax({
    url: current_weather_url,
    method: "GET",
}).then(function(current_data){
    console.log(current_data);
    var temp = Math.round(((current_data.main.temp - 273.15)*9/5+32));
    console.log("The Tempurature in " + city + "is: " + temp);
    $("#" + day_number + "Tempurature").text("Temp:" + temp + String.fromCharCode(176)+"f");
    $("#" + day_number + "Humidity").text("Humidity:" + response.list[i].main.humidity);
    $("#today_icon_div").attr({"src": "http://openweathermap.org/img/w/" + current_data.weather[0].icon + ".png",
    "height": "100px", "width":"100px"});
})
}