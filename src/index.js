//real time
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${month} ${date} <br/> Last updated: ${hour}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
//display forecast
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c7b5ae0ee7938381fd83d5fdfc195c15";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  console.log(apiUrl);
}
function showForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "<div>";
  forecast.forEach(function (forecastDay, index) {
    console.log(forecastDay);
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="forecast-division row">
          <div class="forecast-date col-4">${formatDay(forecastDay.dt)}</div>
          <img src="emoji/${forecastDay.weather[0].icon}.png" alt="${
          forecastDay.weather[0].description
        }" class="forecast-icon col4" />
          <span class="forecast-temp col-4">
            <span class="forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}</span>°c ~
            <span class="forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )}</span>°c
          </span>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}
//default city

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temp-center").innerHTML = temperature;
  cTemp = response.data.main.temp;
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#min-temp");
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = tempMax;
  minTemp.innerHTML = tempMin;
  let description = document.querySelector("#description");
  let apiDescription = response.data.weather[0].description;
  description.innerHTML = apiDescription;
  let humidity = document.querySelector("#humidity");
  let apiHumidity = response.data.main.humidity;
  humidity.innerHTML = apiHumidity;
  let visibility = document.querySelector("#visibility");
  let apiVisibility = response.data.visibility;
  visibility.innerHTML = apiVisibility;
  let windSpeed = document.querySelector("#wind-speed");
  let apiWindSpeed = response.data.wind.speed;
  windSpeed.innerHTML = apiWindSpeed;
  city.innerHTML = response.data.name;
  let dateElement = document.querySelector("#date-real-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#weather-icon-today");
  iconElement.setAttribute(
    "src",
    `./emoji/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  getForecast(response.data.coord);
}
let city = document.querySelector("#city");
let cityC = city.innerHTML;
let apiKey = "c7b5ae0ee7938381fd83d5fdfc195c15";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&q=${cityC}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

//searchInput to cityplace
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
function search(city) {
  let apiKey = "c7b5ae0ee7938381fd83d5fdfc195c15";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//current button
function getNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c7b5ae0ee7938381fd83d5fdfc195c15";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//unit conversation
function showTempF(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fTemp = Math.round((cTemp * 9) / 5 + 32);
  document.querySelector("#temp-center").innerHTML = fTemp;
}
function showTempC(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#temp-center").innerHTML = Math.round(cTemp);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getNavigator);

let cTemp = null;

let fahrenheitLink = document.querySelector("#temp-f");
fahrenheitLink.addEventListener("click", showTempF);

let celsiusLink = document.querySelector("#temp-c");
celsiusLink.addEventListener("click", showTempC);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
