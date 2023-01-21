const apiKey = '1ed6d5923b682c3be47b72784d5242e9';
let limit = 5;

// units default to imperial
let units = 'imperial';

const btn = document.querySelector('#getWeatherButton');
const form = document.querySelector('#weatherForm');
const currWeatherInfoPrimary = document.querySelector('.currWeatherInfoPrimary');
const currWeatherInfoSecondary = document.querySelector('.currWeatherInfoSecondary');

// Returns url for requesting geographic coordinates.
let geocodeUrl = () => `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`;
// Returns url for requesting weather data.
let weatherUrl = (coords) => `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=${units}`;

// Request geographic coordinates from API.
async function requestCoords() {
    const response = await fetch(geocodeUrl())
    const data = await response.json()
    const coords = { lat: data[0].lat, lon: data[0].lon };
    return coords;
}

// Request weather data from API.
async function requestWeather(coords) {
    const response = await fetch(weatherUrl(coords))
    const data = await response.json()
    return data;
}

// Request current weather.
async function forecast() {
    const coords = await requestCoords();
    const weatherData = await requestWeather(coords);

    // Show city.
    const cityDiv = document.createElement('div');
    cityDiv.classList.add('city');

    // Validate city name.
    let cityName = document.getElementById('cityNameInput').value;
    cityName = cityName.toUpperCase();
    cityDiv.textContent = cityName;
    currWeatherInfoPrimary.appendChild(cityDiv);

    // Show temp.
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('tempVal');
    tempDiv.textContent = Math.round(weatherData.main.temp) + '°F';
    currWeatherInfoPrimary.appendChild(tempDiv);

    // Show weather.
    const weatherDiv = document.createElement('div');
    weatherDiv.textContent = weatherData.weather[0].main;
    currWeatherInfoPrimary.appendChild(weatherDiv);

    // Show temp max.
    const tempMaxDiv = document.createElement('div');
    tempMaxDiv.textContent = 'Temp max: ' + Math.round(weatherData.main.temp_max) + '°F';
    currWeatherInfoSecondary.appendChild(tempMaxDiv);

    // Show temp min.
    const tempMinDiv = document.createElement('div');
    tempMinDiv.textContent = 'Temp min: ' + Math.round(weatherData.main.temp_min) + '°F';
    currWeatherInfoSecondary.appendChild(tempMinDiv);

    // Show feels like.
    const feelsLikeDiv = document.createElement('div');
    feelsLikeDiv.textContent = 'Feels like: ' + Math.round(weatherData.main.feels_like) + '°F';
    currWeatherInfoSecondary.appendChild(feelsLikeDiv);

    // Show windspeed.
    const windSpeedDiv = document.createElement('div');
    windSpeedDiv.textContent = 'Wind speed: ' + Math.round(weatherData.wind.speed) + 'mph';
    currWeatherInfoSecondary.appendChild(windSpeedDiv);

    // Show humidity.
    const humidityDiv = document.createElement('div');
    humidityDiv.textContent = 'Humidity: ' + weatherData.main.humidity + '%';
    currWeatherInfoSecondary.appendChild(humidityDiv);

    // Show pressure.
    const pressureDiv = document.createElement('div');
    pressureDiv.textContent = 'Pressure: ' + weatherData.main.pressure + 'hPa';
    currWeatherInfoSecondary.appendChild(pressureDiv);
}

// Submits and displays forecast on enter key press or button.
async function forecastSubmit(e) {
    // Prevent multiple submit on button.
    btn.disabled = true;

    // Cancels the event.
    e.preventDefault();

    // Do nothing if form is empty.
    if (document.getElementById('cityNameInput').value == '') {
        btn.disabled = false;
        return;
    }

    // Clear divs.
    while (currWeatherInfoPrimary.firstChild) {
        currWeatherInfoPrimary.removeChild(currWeatherInfoPrimary.firstChild);
    }
    while (currWeatherInfoSecondary.firstChild) {
        currWeatherInfoSecondary.removeChild(currWeatherInfoSecondary.firstChild);
    }

    cityName = document.getElementById('cityNameInput').value;
    await forecast();
    form.reset();

    // Reenable button after response returns.
    btn.disabled = false;
}

form.addEventListener('submit', forecastSubmit);
btn.addEventListener('click', forecastSubmit);