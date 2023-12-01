"use strict";

let weatherDropMenu = document.getElementById('weatherDropdown');

window.onload = function () {
    weatherDropDown();

    weatherDropMenu.onchange = getWeatherApi;
}

function weatherDropDown() {
    let defaultOption = new Option('Select One');
    weatherDropMenu.appendChild(defaultOption);

    cities.forEach(city => {
        let option = new Option(city.city); 
        weatherDropMenu.appendChild(option);
    })
}
function getWeatherApi() {
    const selectedCityName = weatherDropMenu.value;

    const location = cities.find(city => city.city === selectedCityName);

    if (!location) {
        console.log(`City not found: ${selectedCityName}`);
        return;
    }

    const { Latitude, Longitude } = location;

    const fetchWeatherUrl = `https://api.weather.gov/points/${Latitude},${Longitude}`;

    fetch(fetchWeatherUrl)
        .then(response => response.json())
        .then(cityForecast => {
            console.log(cityForecast); 
            const forecastUrl = cityForecast.properties.forecast;
            return fetchPeriods(forecastUrl);
        })
        .catch(error => {
            console.log(`Error fetching the weather data`, error);
        });
}

function fetchPeriods(forecastUrl) {
    fetch(forecastUrl)
        .then(response => response.json())
        .then(forecastData => {
            const periods = forecastData.properties.periods;
            displayWeather(periods) 
        })
        .catch(error => {
            console.log(`Error fetching the periods data`, error);
        });
}



function displayWeather(periods) {
    let weatherTable = document.getElementById('displayTable');

    weatherTable.innerHTML = '';

    let table = document.createElement('table');
    weatherTable.appendChild(table);

    let tableHeader = document.createElement('thead');
    table.appendChild(tableHeader);

    // let headerRow = tableHeader.insertRow();
    // let headers = ['Name', 'Wind Speed', 'Temperature', 'Short Forecast'];

    // headers.forEach(headerText => {
    //     let header = document.createElement('th');
    //     header.textContent = headerText;
    //     headerRow.appendChild(header);
    // });

    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    periods.forEach(period => {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.textContent = period.name;
        cell2.textContent = period.windSpeed;
        cell3.textContent = period.temperature;
        cell4.textContent = period.shortForecast;
    });
}



