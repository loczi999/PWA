const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('p.error_message');
const cityName = document.querySelector('h2#city_name');
const weatherImg = document.querySelector('img.weather_img');
const temp = document.querySelector('p.temp');
const description = document.querySelector('p.description');
const feelsLike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const windSpeed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');
const visibility = document.querySelector('span.visibility');
const pollutionImg = document.querySelector('img.pollution_img');
const pollutionValue = document.querySelector('span.pollution_value');


const apiInfo = {
    link : 'https://api.openweathermap.org/data/2.5/weather?q=',
    key : '&appid=364f3a2e5a19b667cde7ecec57968b1f',
    units : '&units=metric',
    lang : '&lang=pl'
}

function getWeatherInfo (){
    const apiInfoCity = input.value;
    const URL = `${apiInfo.link}${apiInfoCity}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;
    //console.log(URL);
    axios.get(URL).then((response) =>{
        console.log(response.data);

        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        weatherImg.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        temp.textContent = `${Math.round(response.data.main.temp)} °C`;
        description.textContent = `${response.data.weather[0].description}`;
        feelsLike.textContent = `${Math.round(response.data.main.feels_like)} °C`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        windSpeed.textContent = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
        clouds.textContent = `${response.data.clouds.all}%`;
        visibility.textContent = `${response.data.visibility /1000} km`;
        errorMsg.textContent = "";
        
        const url_pollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}${apiInfo.key}`;
        axios.get(url_pollution).then((res)=>{
            console.log(res.data);
            pollutionValue.textContent = `${res.data.list[0].components.pm2_5}`;
        })

}).catch((error) =>{
    //console.log(error.response.data);
    errorMsg.textContent=`${error.response.data.message}`;
    [cityName, temp, description, feelsLike, pressure, humidity, windSpeed, clouds, visibility].forEach(el => {el.textContent = '';})
    weatherImg.src = '';

}).finally(() =>{
    input.value = '';
}) 

}

function getWeatherInfoByEnter (e){
    if (e.key === 'Enter'){
        getWeatherInfo();
}
}
    button.addEventListener('click',getWeatherInfo);
    input.addEventListener('keypress',getWeatherInfoByEnter);













