let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentHour = now.getHours();
if (currentHour > 11) {
  currentHour = `${currentHour - 12}:${currentMinutes}pm`;
} else {
  currentHour = `${currentHour}:${currentMinutes}am`;
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let dateTimeNow = document.querySelector("#date-time-now");
dateTimeNow.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} at ${currentHour}`;

function showCurrentWeather(response) {
  let temp = Math.round(response.data.main.temp);
  fahrenheitTemp = response.data.main.temp;
  let tempInput = document.querySelector("#temp");
  tempInput.innerHTML = `${temp}`;
  let weatherDesc = response.data.weather[0].description;
  let weatherDescInput = document.querySelector("#weather-desc-input");
  weatherDescInput.innerHTML = `${weatherDesc}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedInput = document.querySelector("#wind-speed-input");
  windSpeedInput.innerHTML = `wind: ${windSpeed} mph`;
  let humidity = response.data.main.humidity;
  let humidityInput = document.querySelector("#humidity-input");
  humidityInput.innerHTML = `humidity: ${humidity}%`;
  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-city");
  let cityUpdate = document.querySelector(".cityUpdate");
  cityUpdate.innerHTML = `${cityInput.value}`;
  let cityUpdate2 = document.querySelector(".cityUpdate2");
  cityUpdate2.innerHTML = `${cityInput.value}`;
  let apiKey = "7c78b83b2a3e65f370802905f8ab06e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showCurrentWeather);
}

let city = document.querySelector("#search");
city.addEventListener("submit", updateCity);

function clickCurrent() {
  navigator.geolocation.getCurrentPosition(findCurrentLatLon);
}
function showCurrentWeather2(response) {
  let cityName = response.data.name;
  let cityUpdate = document.querySelector(".cityUpdate");
  cityUpdate.innerHTML = `${cityName}`;
  let cityUpdate2 = document.querySelector(".cityUpdate2");
  cityUpdate2.innerHTML = `${cityName}`;
  let temp = Math.round(response.data.main.temp);
  let tempInput = document.querySelector("#temp");
  fahrenheitTemp = response.data.main.temp;
  tempInput.innerHTML = `${temp}`;
  let weatherDesc = response.data.weather[0].description;
  let weatherDescInput = document.querySelector("#weather-desc-input");
  weatherDescInput.innerHTML = `${weatherDesc}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedInput = document.querySelector("#wind-speed-input");
  windSpeedInput.innerHTML = `wind: ${windSpeed} mph`;
  let humidity = response.data.main.humidity;
  let humidityInput = document.querySelector("#humidity-input");
  humidityInput.innerHTML = `humidity: ${humidity}%`;
  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Sun", "Mon", "Tues", "Weds"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3">
            <div class="card">
              <div class="card-body">
                <div class="weatherForecastDate">${day}</div>
                <div>
                  <img
                    src="media/partly_sunny_rainy_icon.svg"
                    alt=""
                  />
                </div>
                <div class="weatherForecastTemps"><span class="weatherForecastTempMax">92°</span>/<span class="weatherForecastTempMin">78°</span></div>
                <div class="forecastedPrecipLine">💧<span class="forecastedPrecip">10</span>%</div>
              </div>
            </div>
          </div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}

function findCurrentLatLon(position) {
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiKey = "7c78b83b2a3e65f370802905f8ab06e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showCurrentWeather2);
}
let currentLoc = document.querySelector(".currentLoc");
currentLoc.addEventListener("click", clickCurrent);

function showCelsiusTemp(event) {
  event.preventDefault;
  let celsiusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  let tempElement = document.querySelector("#temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  tempElement.innerHTML = `${celsiusTemp}`;
}

function showFahrenheitTemp(event) {
  event.preventDefault;
  let tempElement = document.querySelector("#temp");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
let fahrenheitTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

displayForecast();
