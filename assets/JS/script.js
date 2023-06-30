api key f115467d5bc5ff3fdd8e734aafaa3e8a
var city = [];
var url = [];
var APIkey = [];
var currentUrl = [];
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

function searchClicker