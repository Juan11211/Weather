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
        let option = new Option(city.city); // Assuming city.name is the property you want to display
        weatherDropMenu.appendChild(option);
    })
}

async function getWeatherApi() {
    const selectedCityName = weatherDropMenu.value;

    const location = cities.find(city => city.city === selectedCityName);

    const { Latitude, Longitude } = location;

    const fetchWeatherUrl = `https://api.weather.gov/points/${Latitude},${Longitude}`;

    await fetch(fetchWeatherUrl)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(`Cant search for the api`)
}


