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

//default city
let city = document.querySelector("#city");
let cityC = city.innerHTML;
let apiKey = "c7b5ae0ee7938381fd83d5fdfc195c15";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let tempC = document.querySelector("#temp-center");
  tempC.innerHTML = temperature;
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
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

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
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getNavigator);
