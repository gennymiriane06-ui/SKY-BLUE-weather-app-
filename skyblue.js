const cityinput = document.getElementById("cityinput");
const searchbtn = document.getElementById("searchbtn");

const weatherInfo = document.getElementById("weather-info");
const placeholder = document.getElementById("placeholder");

searchbtn.addEventListener("click", () => {
  const city = cityinput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  getWeather(city);
});

// ENTER key support
cityinput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchbtn.click();
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "City not found");
    }

    showWeather(data);

    localStorage.setItem("lastCity", city);

  } catch (err) {
    alert(err.message);
  }
}

function showWeather(data) {

  // switch UI state
  placeholder.style.display = "none";
  weatherInfo.style.display = "block";

  document.getElementById("cityname").textContent = data.name;

  document.getElementById("temperature").textContent =
    Math.round(data.main.temp) + "°";

  document.getElementById("description").textContent =
    data.weather[0].description;

  document.getElementById("feelslike").textContent =
    Math.round(data.main.feels_like) + "°";

  document.getElementById("humidity").textContent =
    data.main.humidity + "%";

  document.getElementById("wind").textContent =
    data.wind.speed + " km/h";

  document.getElementById("weathericon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// load last city
window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");

  if (lastCity) {
    getWeather(lastCity);
  }
});