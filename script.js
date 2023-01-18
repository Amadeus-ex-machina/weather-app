

// Fix enter key to make submit box work.
// Remove button.

const apiKey = '1ed6d5923b682c3be47b72784d5242e9';

let cityName = 'Seoul';
let limit = 5;

// Latitude and longitude.
let coords = { lat: 0, lon: 0 };

// Weather information.
let temp = 0;
let tempMax = 0;
let tempMin = 0;

let feelsLike = 0;
let humidity = 0;
let pressure = 0;

let windSpeed = 0;
let weather = '';


let units = 'imperial';

let geocodeUrl = () => `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`;
let weatherUrl = () => `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=${units}`;

async function requestCoords() {
    const response = await fetch(geocodeUrl())
    const data = await response.json()

    coords.lat = data[0].lat;
    coords.lon = data[0].lon;

    return coords;
}

async function requestWeather() {
    await requestCoords();
    const response = await fetch(weatherUrl())
    const weatherData = await response.json()

    temp = weatherData.main.temp;
    tempMax = weatherData.main.temp_max;
    tempMin = weatherData.main.temp_min;

    feelsLike = weatherData.main.feels_like;
    humidity = weatherData.main.humidity;
    pressure = weatherData.main.pressure;

    windSpeed = weatherData.wind.speed;
    weather = weatherData.weather[0].main;

    return weatherData;
}

const main = document.querySelector('.main');
const weatherInfo = document.querySelector('.weatherInfo');

async function forecast() {
    // await requestCoords();
    // await requestWeather();
    console.log('Coords', await requestCoords());
    console.log('Weather', await requestWeather());

    // Show city.
    const cityDiv = document.createElement('div');
    cityDiv.classList.add('city');

    let cityName = document.getElementById('cityNameInput').value;
    cityName = cityName.toUpperCase();
    cityDiv.textContent = cityName;
    main.appendChild(cityDiv);

    // Show temp.
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('tempVal');
    tempDiv.textContent = Math.round(temp) + '°F';
    main.appendChild(tempDiv);

    // Show weather.
    const weatherDiv = document.createElement('div');
    weatherDiv.textContent = weather;
    main.appendChild(weatherDiv);


    // SUPPLEMENTARY WEATHER INFO BELOW:

    // Show temp max.
    const tempMaxDiv = document.createElement('div');
    tempMaxDiv.textContent = 'Temp max: ' + Math.round(tempMax) + '°F';
    weatherInfo.appendChild(tempMaxDiv);

    // Show temp min.
    const tempMinDiv = document.createElement('div');
    tempMinDiv.textContent = 'Temp min: ' + Math.round(tempMin) + '°F';
    weatherInfo.appendChild(tempMinDiv);

    // Show feels like.
    const feelsLikeDiv = document.createElement('div');
    feelsLikeDiv.textContent = 'Feels like: ' + Math.round(feelsLike) + '°F';
    weatherInfo.appendChild(feelsLikeDiv);

    // Show windspeed.
    const windSpeedDiv = document.createElement('div');
    windSpeedDiv.textContent = 'Wind speed: ' + Math.round(windSpeed) + 'mph';
    weatherInfo.appendChild(windSpeedDiv);

    // Show humidity.
    const humidityDiv = document.createElement('div');
    humidityDiv.textContent = 'Humidity: ' + humidity + '%';
    weatherInfo.appendChild(humidityDiv);

    // Show pressure.
    const pressureDiv = document.createElement('div');
    pressureDiv.textContent = 'Pressure: ' + pressure + 'hPa';
    weatherInfo.appendChild(pressureDiv);

}

const btn = document.querySelector('#getWeatherButton');
const form = document.querySelector('#weatherForm');

// This was difficult, complicated way to make form work on enter.
async function forecastSubmit(e) {
    // Prevent multiple submit on button.
    btn.disabled = true;

    // Cancels the event.
    e.preventDefault();

    // Validate form.
    if (document.getElementById('cityNameInput').value == '') {
        btn.disabled = false;
        return;
    }

    // Clear divs.
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    while (weatherInfo.firstChild) {
        weatherInfo.removeChild(weatherInfo.firstChild);
    }

    cityName = document.getElementById('cityNameInput').value;
    console.log(cityName);
    await forecast();
    form.reset();

    // Reenable button after response returns.
    btn.disabled = false;
}

form.addEventListener('submit', forecastSubmit);
btn.addEventListener('click', forecastSubmit);
