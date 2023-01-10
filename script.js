

const api_key = '1ed6d5923b682c3be47b72784d5242e9';

const city_name = 'Seoul';

let lat = 0;
let lon = 0;

let units = 'imperial';


let geocode_url = () => `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${api_key}`;
let weather_url = () => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`;

async function getGeo() {
    const response = await fetch(geocode_url())
    const data = await response.json()
    lat = data[0].lat;
    lon = data[0].lon;
    console.log(lat);
    console.log(lon);
}

async function getWeather() {
    const response = await fetch(weather_url())
    const data = await response.json()
    console.log(data);
}

async function getForecast() {
    await getGeo();
    await getWeather();
}

getForecast();