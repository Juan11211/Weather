"use strict"

window.onload = function(){
    let weatherDropMenu = document.getElementById('weatherDropdown');
    let displayTable = document.getElementById('displayTable');

    weatherDropDown();


    
}

function weatherDropDown(){

    let defaultOption = new Option('Select One');
        weatherDropMenu.appendChild(defaultOption);
    
    cities.forEach(city => {
        let options = new Option(city.city);
        weatherDropMenu.appendChild(options)
    })

    weatherDropMenu.onchange = function(){
        const selectedCity = weatherDropMenu.value;
        displayTable(selectedCity);
    }
    }

// function displayTable(selectedCity){
    
//     // create table now
//    const tableContainer = document.createElement('div');
//    const table = document.createElement('table');
//    tableContainer.appendChild(table);
//    tableContainer.innerHTML = "";

//    const tableHeader = document.createElement('thead');
//    tableHeader
// }

// function getWeather(city){
//     fetch(`https://api.weather.gov/points/${city.}`)
// }


