var inputCity = document.querySelector('#cityInput');
var btn = document.querySelector('#add');
var cityOutput = document.querySelector('#cityOutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');

const apiKey = "7b5bf2094eae1347c404c3516f35aa51";

function convertKelvinToCelsius(val) {
    return (val - 273.15).toFixed(2); // Convert Kelvin to Celsius and round to 2 decimal places
}

function fetchWeather(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputCity.value + '&appid=' + apiKey)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const name = data.name;
            const descriptionText = data.weather[0].description;
            const temperature = convertKelvinToCelsius(data.main.temp);
            const windSpeed = data.wind.speed;

            cityOutput.innerHTML = `Weather of <span>${name}</span>`;
            temp.innerHTML = `Temperature: <span>${temperature}°C</span>`;
            description.innerHTML = `Sky condition: <span>${descriptionText}</span>`;
            wind.innerHTML = `Wind Speed: <span>${windSpeed} m/s</span>`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Oops! Something went wrong. Please try again later.");
        });
}

btn.addEventListener('click', function() {
    fetchWeather(inputCity.value);
});