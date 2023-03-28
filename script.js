const apiKey = "59ab9a49966c9014de412ce4190c3fb6";
const searchForm = document.querySelector("form");
const searchInput = document.querySelector("#city-input");
const searchHistory = document.querySelector("#search-history");

// Get current weather data for a city
async function getCurrentWeather(city) {
    const response = await fetch(
    https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric
    );
    const data = await response.json();
    return data;
    }
    
    // Get 5-day forecast data for a city
    async function getForecast(city) {
    const response = await fetch(
    https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric
    );
    const data = await response.json();
    return data;
    }
    
    // Render current weather data for a city
    function renderCurrentWeather(data) {
    const currentWeather = document.querySelector("#current-weather");
    currentWeather.innerHTML = <h2>${data.name}</h2> <p>${new Date().toLocaleDateString()}</p> <img class="icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}" /> <p>Temperature: ${data.main.temp} &deg;C</p> <p>Humidity: ${data.main.humidity}%</p> <p>Wind Speed: ${data.wind.speed} m/s</p> ;
    }
    
    // Render forecast data for a city
    function renderForecast(data) {
    const forecast = document.querySelector("#forecast");
    forecast.innerHTML = "";
    for (let i = 0; i < data.list.length; i += 8) {
    const forecastDay = data.list[i];
    forecast.innerHTML += <div class="forecast-day"> <h3>${new Date(forecastDay.dt * 1000).toLocaleDateString()}</h3> <img class="icon" src="https://openweathermap.org/img/w/${forecastDay.weather[0].icon}.png" alt="${forecastDay.weather[0].description}" /> <p>Temperature: ${forecastDay.main.temp} &deg;C</p> <p>Humidity: ${forecastDay.main.humidity}%</p> </div> ;
    }
    }
    
    // Render search history
    function renderSearchHistory(history) {
    searchHistory.innerHTML = "";
    for (let i = 0; i < history.length; i++) {
    searchHistory.innerHTML += <div class="search-item" data-city="${history[i]}">${history[i]}</div> ;
    }
    }
    
    // Load search history from local storage
    function loadSearchHistory() {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    renderSearchHistory(history);
    }
    
    // Save city to search history
    function saveToSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(history));
    renderSearchHistory(history);
    }
    }
    
    // Handle search form submission
    searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
    try {
    const currentWeatherData = await getCurrentWeather(city);
    const forecastData = await getForecast(city);
    renderCurrentWeather(currentWeatherData);
    renderForecast(forecastData);
    saveToSearchHistory(city);
    searchInput.value = "";
    } catch (error) {
    console.log(error);
    alert("City not found. Please try again.");
    }
    }
    });
    
    // Handle click on search history item
    searchHistory.addEventListener("click", async (e) => {
    if (e.target.classList.contains("search-item")) {
    const city = e.target.dataset.city
    }})
    try {
        const currentWeatherData = await getCurrentWeather(city);
        const forecastData = await getForecast(city);
        renderCurrentWeather(currentWeatherData);
        renderForecast(forecastData);
        searchInput.value = "";
      } catch (error) {
        console.log(error);
        alert("City not found. Please try again.");
      }