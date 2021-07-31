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
dateTimeNow.innerHTML = `Updated: ${currentDay}, ${currentMonth} ${currentDate} at ${currentHour}`;

function getForecast(coordinates) {
  let apiKey = "7c78b83b2a3e65f370802905f8ab06e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
  axios.get(apiUrl).then(showWeatherToday);
  axios.get(apiUrl).then(showWeatherHourly);
}

function showCurrentWeather(response) {
  let cityUpdate = document.querySelector(".cityUpdate");
  cityUpdate.innerHTML = response.data.name;
  let cityUpdate2 = document.querySelector(".cityUpdate2");
  cityUpdate2.innerHTML = response.data.name;
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
  getForecast(response.data.coord);
}
function convertTimeStampToHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  let hours = [
    "12:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
  ];
  return hours[hour];
}

function showWeatherHourly(response) {
  let hourlyForecast = response.data.hourly;
  let hourlyTemp = response.data.hourly[0].temp;
  console.log(response.data.hourly);

  let hourlyForecastElement = document.querySelector("#hourly-forecast");
  let hourlyForecastHTML = "";
  hourlyForecast.forEach(function (forecastHour, index) {
    if (forecastHour.pop > 0.5) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `<li><span>${convertTimeStampToHour(
          forecastHour.dt
        )} </span><span></span><span>${Math.round(
          forecastHour.temp
        )}°</span> and <span></span><span>💧${Math.round(
          forecastHour.pop * 100
        )}%
      </span><span>☂</span></li>`;
    } else {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `<li><span>${convertTimeStampToHour(
          forecastHour.dt
        )} </span><span></span><span>${Math.round(
          forecastHour.temp
        )}°</span> and <span></span><span>💧${Math.round(
          forecastHour.pop * 100
        )}%
      </span><span>👟</span></li>`;
    }
  });
  hourlyForecastElement.innerHTML = hourlyForecastHTML;
}

function showWeatherToday(response) {
  let todayHighTemp = document.querySelector(".todayHighTemp");
  let todayLowTemp = document.querySelector(".todayLowTemp");
  let todayDailyDesc = document.querySelector(".todayDailyDesc");
  let highTempAPI = Math.round(response.data.daily[0].temp.max);
  todayHighTemp.innerHTML = `${highTempAPI}°`;
  let lowTempAPI = Math.round(response.data.daily[0].temp.min);
  todayLowTemp.innerHTML = `${lowTempAPI}°`;
  todayDailyDesc.innerHTML = response.data.daily[0].weather[0].description;
  let todayIcon = document.querySelector(".todayIcon");
  todayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png`
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
function convertTimeStampToDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5 && index > 0) {
      let forecastPrecip = Math.round(forecastDay.pop * 100);
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
            <div class="card">
              <div class="card-body">
                <div class="weatherForecastDate">${convertTimeStampToDay(
                  forecastDay.dt
                )}</div>
                <div>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                  />
                </div>
                <div class="weatherForecastTemps"><span class="weatherForecastTempMax">${Math.round(
                  forecastDay.temp.max
                )}°</span>/<span class="weatherForecastTempMin">${Math.round(
          forecastDay.temp.min
        )}°</span></div>
                <div class="forecastedPrecipLine">💧<span class="forecastedPrecip">${forecastPrecip}</span>%</div>
              </div>
            </div>
          </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function findCurrentLatLon(position) {
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiKey = "7c78b83b2a3e65f370802905f8ab06e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showCurrentWeather);
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

clickCurrent();
