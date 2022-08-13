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
  let date = new date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//display forecast
function getForecast(coordinates) {
  let apiKey = "c7b5ae0ee7938381fd83d5fdfc195c15";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "<div>";
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index !== 0) {
      forecastHTML =
        forecastHTML +
        `
        <div class="forecast-division row">
          <div class="forecast-date col-4">${formatDay(forecastDay.dt)}</div>
          <img src="emoji/${
            forecastDay.weather[0].icon
          }.png" alt="sunny" class="forecast-icon col4" />
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
  console.log(response);
}

//default city
let city = document.querySelector("#city");
let cityC = city.innerHTML;
let apiKey = "c7b5ae0ee7938381fd83d5fdfc195c15";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

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
  console.log(response.data);
  getForecast(response.data.coord);
  console.log(response.data.coord);
}
axios.get(`${apiUrl}&q=${cityC}&appid=${apiKey}`).then(showTemperature);

//searchInput to cityplace
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
  } else {
    city.innerHTML = `enter city`;
  }
  let apiKey = "c7b5ae0ee7938381fd83d5fdfc195c15";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
  axios
    .get(`${apiUrl}&q=${searchInput.value}&appid=${apiKey}`)
    .then(showTemperature);
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
  axios
    .get(`${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(showTemperature);
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
form.addEventListener("submit", search);
displayForecast();
