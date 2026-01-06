const getWeatherData = () => {
    const userInput = document.querySelector("input").value;
    const accessKey = API_ACCESS_KEY;
    console.log(userInput);
    const url = `https://api.weatherstack.com/current?access_key=${accessKey}&query=${userInput}`;
    console.log(url);
  
    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.querySelector("h1").innerText = data.location.name;
            document.querySelector("h2").innerText = `${data.current.temperature} ℃`;
            document.querySelector("#weatherCondition").innerText = `It is currently ${data.current.weather_descriptions[0].toLowerCase()} outside.`;
            
            document.querySelector("#airQuality").innerText = `Air quality: ${translateAirQuality(data.current.air_quality["us-epa-index"])}`;
            
            document.querySelector("#windInfo").innerText = `The wind is blowing at a speed of ${data.current.wind_speed} in the direction of ${data.current.wind_dir}.`;
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