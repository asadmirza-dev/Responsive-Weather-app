console.log("script loaded");

const apikey = "1e378e950af0db4c7fba1afe530d3603";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
    if(city === "") {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // Weather icons
        if(data.weather[0].main === "Clouds") weathericon.src = "more cloud sun.png";
        else if(data.weather[0].main === "Clear") weathericon.src = "sun.png";
        else if(data.weather[0].main === "Rain") weathericon.src = "rain sun.png";
        else if(data.weather[0].main === "Drizzle") weathericon.src = "storm.png";
        else if(data.weather[0].main === "Mist") weathericon.src = "less cloud sun.png";
        else weathericon.src = ""; // default if unknown

        // Update HTML
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".weather-update").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.log(error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather-update").style.display = "none";
    }
}

// Only search button click triggers API
searchbtn.addEventListener("click", function() {
    const city = searchbox.value.trim();
    checkweather(city);
});

// Optional: Press Enter key to search
searchbox.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        const city = searchbox.value.trim();
        checkweather(city);
    }
});


