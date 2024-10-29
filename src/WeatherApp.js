import React, { useState } from 'react';
import "./WeatherApp.css";

function WeatherApp() {
    const [data, setData] = useState({});
    const [city, setCity] = useState('');
    const [isLoading, setLoading] = useState(false);

    const fetchData = async() => {
        setLoading(true);
        try{
            const apiKey = "5143f44f31e04c518fd81245243105";
            const apiData = await fetch(`https://api.weatherapi.com/v1/current.json?Key=${apiKey}&q=${city}`);
            const actualData = await apiData.json();

            if(actualData.error){
                alert("Failed to fetch weather data");
            }else {
                setData(actualData);
            }
        }catch(error){
            console.error("Failed to fetch weather data");
        }finally{
            setLoading(false);
        }
    }

  return (
    <>
        <div className='inputfield'>
            <input type='text' placeholder='Enter city name' value = {city} onChange={(event) => setCity(event.target.value)}/>
            <button type='button' onClick={fetchData}>Search</button>
        </div>
        <br/><br/>
        
        {isLoading && (<p>Loading data...</p>)}

        {!isLoading && data.current && (
                <div className='weather-cards'>
            <div className='weather-card'>
                <h4>Temperature</h4>
                <p>{data.current.temp_c}°C</p>
            </div>
            <div className='weather-card'>
                <h4>Humidity</h4>
                <p>{data.current.humidity}%</p>
            </div>
            <div className='weather-card'>
                <h4>Condition</h4>
                <p>{data.current.condition.text}</p>
            </div>
            <div className='weather-card'>
                <h4>Wind Speed</h4>
                <p>{data.current.wind_kph} kph</p>
            </div>
        </div> 
            )}
    </>
  )
}

export default WeatherApp;