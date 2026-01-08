// Weatherstack dashboard: https://weatherstack.com/dashboard 
// Weatherstack docs: https://weatherstack.com/documentation

const getWeatherData = () => {
    const userInput = document.querySelector("input").value;
    const accessKey = "3ea447546df23eb5c47b7b25e3d05262";  // This needs updated to your API KEY
    const url = `https://api.weatherstack.com/current?access_key=${accessKey}&query=${userInput}`;
    const weatherReportContainer = document.querySelector("#weather-report-container");
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            weatherReportContainer.innerHTML = `
                <h2>${data.location.name}</h2>
                <h2>${data.current.temperature}°C</h2>
                <p>It is currently ${data.current.weather_descriptions[0].toLowerCase()} outside.</p2>
                <p>Air Quality: ${translateAirQuality(data.current.air_quality["us-epa-index"])}</p>
                <p>The wind is blowing at a speed of ${data.current.wind_speed} in the direction of ${data.current.wind_dir}.</p>
            `;
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        });
}

const translateAirQuality = index => {
    if (index === "1") { return "Good"; }
    if (index === "2") { return "Moderate"; }
    if (index === "3") { return "Unhealthy for sensitive group"; }
    if (index === "4") { return "Unhealthy"; }
    if (index === "5") { return "Very unhealthy"; }
    if (index === "6") { return "Hazardous"; }
}

document.querySelector("button").addEventListener("click", getWeatherData);