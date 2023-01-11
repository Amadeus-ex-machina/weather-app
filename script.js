

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

let geocodeUrl = () => `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`;
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

    // let windSpeed = 0;
    // let weather = '';

    return weatherData;
}

const main = document.querySelector('.main');

async function forecast() {
    // await requestCoords();
    // await requestWeather();
    console.log('Coords', await requestCoords());
    console.log('Weather', await requestWeather());

    // Show temp.
    const tempDiv = document.createElement('div');
    tempDiv.textContent = 'Temp: ' + temp;
    main.appendChild(tempDiv);

    // Show windspeed.
    const windSpeedDiv = document.createElement('div');
    windSpeedDiv.textContent = 'Wind speed: ' + windSpeed;
    main.appendChild(windSpeedDiv);

    // Show temp max.
    const tempMaxDiv = document.createElement('div');
    tempMaxDiv.textContent = 'Temp max: ' + tempMax;
    main.appendChild(tempMaxDiv);

    // Show temp min.
    const tempMinDiv = document.createElement('div');
    tempMinDiv.textContent = 'Temp min: ' + tempMin;
    main.appendChild(tempMinDiv);

    // Show feels like.
    const feelsLikeDiv = document.createElement('div');
    feelsLikeDiv.textContent = 'Feels like: ' + feelsLike;
    main.appendChild(feelsLikeDiv);

    // Show humidity.
    const humidityDiv = document.createElement('div');
    humidityDiv.textContent = 'Humidity: ' + humidity;
    main.appendChild(humidityDiv);

    // Show pressure.
    const pressureDiv = document.createElement('div');
    pressureDiv.textContent = 'Pressure: ' + pressure;
    main.appendChild(pressureDiv);

    // Show weather.
    const weatherDiv = document.createElement('div');
    weatherDiv.textContent = 'Weather: ' + weather;
    main.appendChild(weatherDiv);
}


const btn = document.querySelector('#getWeatherButton');
btn.addEventListener('click', () => {

    // Clear main of divs.
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    cityName = document.getElementById('cityNameInput').value;
    console.log(cityName);
    forecast();
});

// This was difficult, complicated way to make form work on enter.
function forecastSubmit(e) {
    e.preventDefault();

    // Clear main of divs.
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    cityName = document.getElementById('cityNameInput').value;
    console.log(cityName);
    forecast();
}

const form = document.getElementById('form');
form.addEventListener('submit', forecastSubmit);