import { useState, useEffect } from 'react';
import './App.css';
import PropTypes from 'prop-types';

/* Images */
import searchIcon from './assets/search.png';
import humidityIcon from './assets/humidity.png';
import clearSkyIcon from './assets/clearSky.png';
import cloudyIcon from './assets/cloudy.png';
import drizzleIcon from './assets/drizzle.png';
import rainIcon from './assets/rain.png';
import windIcon from './assets/wind.png';
import snowIcon from './assets/snow.png';
import nightClearSkyIcon from './assets/nightClearSky.png';
import nightDrizzleIcon from './assets/nightDrizzle.png';
import nightSnowIcon from './assets/nightSnow.png';
import nightCloudyIcon from './assets/nightCloudy.png';
import maxTempIcon from './assets/maxTemp.png';
import minTempIcon from './assets/minTemp.png';
import sunriseIcon from './assets/sunrise.png';
import sunsetIcon from './assets/sunset.png';
import pressureIcon from './assets/pressure.png';
import windDirectionIcon from './assets/windDirection.png';




const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind, maxTemp, minTemp, weatherDesc, sunrise, sunset, timezone, pressure, windDirection}) => {

    const timeZoneOffsets = {
        "UTC": 0,
        "America/New_York": -14400,  // UTC-5
        "America/Chicago": -18000 ,    // UTC-6
        "America/Denver": -25200 ,      // UTC-7
        "America/Los_Angeles": -28800, // UTC-8
        "America/Argentina/Buenos_Aires": -18000, // UTC-3
        "America/Sao_Paulo": -10800,  // UTC-3
        "Europe/London": 0,            // UTC+0
        "Europe/Berlin": 3600,         // UTC+1
        "Europe/Paris": 3600,          // UTC+1
        "Europe/Moscow": 10800,        // UTC+3
        "Europe/Rome": 3600,           // UTC+1
        "Asia/Kolkata": 19800,         // UTC+5:30
        "Asia/Tokyo": 32400,           // UTC+9
        "Asia/Shanghai": 28800,        // UTC+8
        "Asia/Singapore": 28800,       // UTC+8
        "Asia/Dubai": 14400,           // UTC+4
        "Africa/Cairo": 7200,          // UTC+2
        "Africa/Johannesburg": 7200,   // UTC+2
        "Africa/Nairobi": 10800,       // UTC+3
        "Australia/Sydney": 36000,     // UTC+11 (varies with Daylight Saving Time)
        "Australia/Melbourne": 36000,  // UTC+11 (varies with Daylight Saving Time)
        "Australia/Perth": 28800,      // UTC+8
        "Pacific/Auckland": 46800,     // UTC+13 (varies with Daylight Saving Time)
        "Pacific/Fiji": 43200          // UTC+12 (varies with Daylight Saving Time)
    };


    let t = ""; 
    for (const key in timeZoneOffsets) {
        if (timeZoneOffsets[key] === timezone) {
            t = key;
            break;
        }
    }
    const sunriseDate = new Date(sunrise * 1000); 
    const sunsetDate = new Date(sunset * 1000);

    // Options for formatting the time
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone:t}; // Pass the correct timezone

    // Format the times in the correct timezone
    const sunriseTime = sunriseDate.toLocaleTimeString("en-US", timeOptions);
    const sunsetTime = sunsetDate.toLocaleTimeString("en-US", timeOptions);

    function getCurrentTimeForCity(t) {
        const nowTime = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit',  
            hour12: true, 
            timeZone: t 
        };
        return new Intl.DateTimeFormat('en-US', options).format(nowTime);
    }
    function getCurrentDateForCity(t) {
        const nowDate = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone:t 
        };
        return new Intl.DateTimeFormat('en-US', options).format(nowDate);
    }
    
    const cityTime = getCurrentTimeForCity(t);

    const cityDate = getCurrentDateForCity(t);

    function getWindDirection(windDirection) {
        if (windDirection >= 337.5 || windDirection < 22.5) {
            return "North";
        } else if (windDirection >= 22.5 && windDirection < 67.5) {
            return "Northeast";
        } else if (windDirection >= 67.5 && windDirection < 112.5) {
            return "East";
        } else if (windDirection >= 112.5 && windDirection < 157.5) {
            return "Southeast";
        } else if (windDirection >= 157.5 && windDirection < 202.5) {
            return "South";
        } else if (windDirection >= 202.5 && windDirection < 247.5) {
            return "Southwest";
        } else if (windDirection >= 247.5 && windDirection < 292.5) {
            return "West";
        } else if (windDirection >= 292.5 && windDirection < 337.5) {
            return "Northwest";
        }
    }
    
    const windDirectionString = getWindDirection(windDirection);
    


    return (
        <div className="main-layout w-full flex flex-col md:flex-row mt-5">
            <div className="left-section p-1 w-full h-full">
                <div className="date-time-container text-center text-white mb-2 bg-white bg-opacity-10 rounded-lg p-5">
                    <div className='text-5xl text-iceCold p-2'>{cityTime}</div>
                    <div className='text-4xl text-freezePurple  p-2'>{cityDate}</div>
                </div>
                <div className="weatherDetailsContainer text-center text-white bg-white bg-opacity-10 rounded-lg p-5">
                    <div className="image flex flex-row items-center justify-center">
                        <img src={icon} alt="Weather Icon"/>
                        
                    </div>
                    <div className="desc text-3xl capitalize text-freezePurple   p-2">{weatherDesc}</div>
                    <div className="temp text-5xl font-bold text-iceCold p-2">{temp}&#8451;</div>
                    <div className="location text-2xl text-mediumPurple p-2">{city}</div>
                    <div className="country text-lg text-freezePurple p-2">{country}</div>
                    <div className="cord flex justify-between p-2">
                        <div className="flex flex-col justify-center items-center">
                            <span className="text-lg text-freezePurple">Latitude</span>
                            <span className="text-xl text-iceCold">{lat}</span>
                        </div>
                        <div className="flex flex-col justify-center items-center ">
                            <span className="text-lg text-freezePurple">Longitude</span>
                            <span className="text-xl text-iceCold">{log}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-section p-1 w-full h-full">
                <div className="sunrise-sunset-container grid grid-cols-2 items-center justify-center gap-5 bg-white bg-opacity-10 rounded-lg p-5 shadow-lg w-full h-full">
                    <div className="element text-white flex flex-col items-center justify-center">
                        <img src={sunriseIcon} alt="Sunrise" className='w-16 h-16' />
                        <div className="data text-xl text-iceCold">{sunriseTime}</div>
                        <div className="text-freezePurple text-lg">Sunrise</div>
                    </div>
                    <div className="element text-white flex flex-col items-center justify-center">
                        <img src={sunsetIcon} alt="Sunset" className='w-16 h-16' />
                        <div className="data text-xl text-iceCold">{sunsetTime}</div>
                        <div className="text-freezePurple text-lg">Sunset</div>
                    </div>
                </div>


                <div className="data-container grid grid-cols-2 gap-5 bg-white bg-opacity-10 rounded-lg p-5 shadow-lg mt-2 w-full ">
                    
                    <div className="element text-center text-freezePurple flex flex-col items-center justify-center p-1">
                        <img src={maxTempIcon} alt="Max Temperature" className='w-16 h-16'/>
                        <div className="data text-xl text-iceCold">{maxTemp}&#8451;</div>
                        <div className="text text-lg">Max Temp</div>
                    </div>
                    <div className="element text-center text-freezePurple flex flex-col items-center justify-center p-1">
                        <img src={minTempIcon} alt="Min Temperature" className='w-16 h-16' />
                        <div className="data text-xl text-iceCold">{minTemp}&#8451;</div>
                        <div className="text text-lg">Min Temp</div>
                    </div>
                    
                    <div className="element text-center text-freezePurple flex flex-col items-center justify-center ">
                        <img src={humidityIcon} alt="Humidity" className='w-16 h-16' />
                        <div className="data text-xl text-iceCold">{humidity}%</div>
                        <div className="text text-lg">Humidity</div>
                    </div>
                    <div className="element text-center text-freezePurple flex flex-col items-center justify-center">
                        <img src={pressureIcon} alt="Pressure" className='w-16 h-16' />
                        <div className="data text-xl text-iceCold">{pressure} hPa</div>
                        <div className="text text-lg">Pressure</div>
                    </div>
                    <div className="element text-center text-freezePurple flex flex-col items-center justify-center">
                        <img src={windIcon} alt="Wind" className='w-16 h-16' />
                        <div className="data text-xl text-iceCold">{wind} m/s</div>
                        <div className="text text-lg">Wind Speed</div>
                    </div>
                    <div className="element text-center text-freezePurple flex flex-col items-center justify-center">
                        <img src={windDirectionIcon} alt="Wind" className='w-16 h-16' />
                        <div className="data text-xl text-iceCold">{windDirectionString} </div>
                        <div className="text text-lg">Wind Direction</div>
                    </div>
                   
                    
                </div>
            </div>
        </div>
    );
};

WeatherDetails.propTypes = {
    icon: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    log: PropTypes.number.isRequired,
    maxTemp: PropTypes.number.isRequired,
    minTemp: PropTypes.number.isRequired,
    weatherDesc: PropTypes.string.isRequired,
    sunrise: PropTypes.number.isRequired,
    sunset: PropTypes.number.isRequired,
    timezone: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired
};

function App() {
    const [icon, setIcon] = useState(cloudyIcon);
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState(0);
    const [log, setLog] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [pressure, setPressure] = useState(0);
    const [windDirection, setWindDirection] = useState(0);
    const [maxTemp, setMaxTemp] = useState(0);
    const [minTemp, setMinTemp] = useState(0);
    const [weatherDesc, setWeatherDesc] = useState("");
    const [sunrise, setSunrise] = useState(0);
    const [sunset, setSunset] = useState(0);
    const [timezone, setTimezone] = useState(0);
    const [text, setText] = useState("Salem");
    const [cityNotFound, setCityNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const weatherIconMap = {
        "01d": clearSkyIcon,
        "01n": nightClearSkyIcon,
        "02d": cloudyIcon,
        "02n": nightCloudyIcon,
        "03d": drizzleIcon,
        "03n": nightDrizzleIcon,
        "04d": drizzleIcon,
        "04n": nightDrizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": nightSnowIcon,
    };

    const api_key = "c862320c89c31f48643ea6e26051b052";

const search = async () => {
    setLoading(true);
    setError(null);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
        let res = await fetch(url);
        let data = await res.json();
        console.log("API Response Data:", data); // Log the entire response

        if (data.cod === "404") {
            setCityNotFound(true);
            setLoading(false);
            return;
        }

        // Extract data from the response
        setSunrise(data.sys.sunrise);
        setSunset(data.sys.sunset);
        setTimezone(data.timezone);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setPressure(data.main.pressure);
        setWindDirection(data.wind.deg);
        setMaxTemp(data.main.temp_max);
        setMinTemp(data.main.temp_min);
        setWeatherDesc(data.weather[0].description);
        setTemp(Math.floor(data.main.temp));
        setCity(data.name);
        setCountry(data.sys.country); // Check if this is returning the expected value
        setLat(data.coord.lat);
        setLog(data.coord.lon);

        const weatherIconCode = data.weather[0].icon;
        setIcon(weatherIconMap[weatherIconCode] || clearSkyIcon);
        setCityNotFound(false);

    } catch (error) {
        setError("An error occurred while fetching data");
        console.error("Fetch Error:", error); // Log the error for more context
    } finally {
        setLoading(false);
    }
};


    useEffect(() => {
        search();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        search();
    };

    return (
        <div className="app min-h-screen flex items-center justify-center bg-heavyPurple">
            <div className="container w-full max-w-6xl p-5">
                <div className="search-box flex justify-center md:w-1/9 sm:w-1/9 ">
                    <form onSubmit={handleSubmit} className="flex items-center bg-white bg-opacity-10 rounded-lg p-2 shadow-lg md:w-1/2 sm:w-1/9 lg:w-1/2">
                        <input
                            type="text"
                            placeholder="Enter a city..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="bg-transparent text-white placeholder-freezePurple outline-none text-md p-2 flex-1"
                        />
                        <button type="submit" className="p-2 focus:outline-none">
                            <img src={searchIcon} alt="Search" />
                        </button>
                    </form>
                </div>

                {loading && (
                    <div className="text-center text-white text-2xl">Loading...</div>
                )}

                {error && (
                    <div className="text-center text-red-500 text-2xl">{error}</div>
                )}

                {cityNotFound && !loading && (
                    <div className="text-center text-white text-2xl">City Not Found</div>
                )}

                {!loading && !cityNotFound && (
                    <WeatherDetails
                        icon={icon}
                        temp={temp}
                        city={city}
                        country={country}
                        lat={lat}
                        log={log}
                        humidity={humidity}
                        wind={wind}
                        pressure={pressure}
                        windDirection={windDirection}
                        maxTemp={maxTemp}
                        minTemp={minTemp}
                        weatherDesc={weatherDesc}
                        sunrise={sunrise}
                        sunset={sunset}
                        timezone={timezone}
                        
                    />
                )}
            </div>
        </div>
    );
}

export default App;

