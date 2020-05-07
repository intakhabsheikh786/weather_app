export const getReverseGeocoding = async (lat, lon) => {
    try {
        const res = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=f8e6a9d3232cbb&lat=${lat}&lon=${lon}&format=json`);
        const result = await res.json();
        return result;
    }
    catch (error) {
        console.log(error);
    }
}
export const getForwardGeocoding = async (string) => {
    try {
        const res = await fetch(`https://us1.locationiq.com/v1/search.php?key=f8e6a9d3232cbb&q=${string}&format=json`);
        const result = await res.json();
        return result;
    }
    catch (error) {
        console.log(error);
    }
}





export const getCurrentPosition = () => {
    return new Promise((accept, reject) => {
        navigator.geolocation.getCurrentPosition(accept, reject);
    });

}





export const getWeatherData = async (lat, lon) => {
    console.log("Getting data from server...");
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&APPID=11271cfdd518ac15f5f2f07a4f8febe7
            `
        );
        return res.json();
    } catch (error) {
        return error
    }
};

export const checkLocationPermission = () => {
    return navigator.permissions.query({ name: 'geolocation' })
}




const weatherData = (current_weather) => {
    let data = {}
    const { temp, humidity, wind_speed, pressure, weather } = current_weather.current;
    const { daily } = current_weather;
    let i = 1;
    const daily_weather = {};
    //forecast for next five days
    while (i <= 5) {
        const { min, max } = daily[i].temp;
        const { main: weather, icon } = daily[i].weather[0];
        daily_weather[i] = { min: min, max: max, weather: weather, icon: icon }
        i += 1;
    }


    data.temp = Math.round(temp);
    data.humidity = humidity;
    data.wind_speed = wind_speed;
    data.pressure = pressure;
    data.icon = weather[0].icon;
    data = { ...data, daily_weather }


    return data;
}

const addressData = (rev_geocoding) => {
    const data = {}
    const { city, country } = rev_geocoding.address;
    data.city = city;
    data.country = country;
    return data;

}



const getData = async (lat, lon, type) => {


    const weather = await getWeatherData(lat, lon);
    const weather_data = weatherData(weather);

    const rev_geocoding = await getReverseGeocoding(lat, lon);
    const rev_geocoding_data = addressData(rev_geocoding);

    let actual_data = { ...weather_data, ...rev_geocoding_data };
    actual_data.current_date = new Date().toDateString();

    return actual_data;
}


export const getDataOnLoad = async () => {
    try {
        const position = await getCurrentPosition();
        const { latitude: lat, longitude: lon } = position.coords;
        return getData(lat, lon);
    } catch (error) {
        return { err_code: "Location", err_message: "User Denied Location Permission" }
    }

}

export const getDataOnSubmit = async (city) => {
    try {
        const res = await getForwardGeocoding(city);
        const { lat, lon } = res[0];
        return getData(lat, lon);


    } catch (error) {
        return { err_code: "API", err_message: "Something is wrong" };
    }
}







