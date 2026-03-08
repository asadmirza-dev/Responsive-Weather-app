console.log("script loaded")

const apikey = "1e378e950af0db4c7fba1afe530d3603"
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchbox = document.querySelector(".search input")
const searchbtn = document.querySelector(".search button")
const weathericon = document.querySelector(".weather-icon")


async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`)
    let data = await response.json()
    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather-update").style.display = "none"
    }
    else{
           if(data.weather[0].main == "Clouds"){
        weathericon.src = "assets/more cloud sun.png"
}
else if(data.weather[0].main == "Clear"){
    weathericon.src = "assets/sun.png"
}
else if(data.weather[0].main == "Rain"){
    weathericon.src = "assets/rain sun.png"
   
}
else if(data.weather[0].main == "Drizzle"){
    weathericon.src = "assets/storm.png"
   
}
else if(data.weather[0].main == "Mist"){
    weathericon.src = "assets/less cloud sun.png"
}
 }
    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"
    document.querySelector(".weather-update").style.display = "block"
}
searchbox.addEventListener("click",function(){
    checkweather(searchbox.value)
})
