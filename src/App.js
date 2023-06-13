import React from "react";
import { useState, useEffect } from "react";
import './App.css';

//e3a99d80bcdcd2c225f746978c00793d

const App = ()=>{
    const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
    const [result, setResult] = useState([])
    const [enterLon, setEnterLon] = useState('-77.0364');
    const [enterLat, setEnterLat] = useState('38.8951');

    async function getResponse(lat, lon) {
        const response = await fetch(`${API_URL}lat=${lat}&lon=${lon}&appid=e3a99d80bcdcd2c225f746978c00793d`);
        const data =await response.json();
        setResult(data);
        console.log(data);
    }

    useEffect(()=>{
        getResponse(enterLat, enterLon);
    }, []);

    function getWeatherData() {
        if(isNaN(enterLat) && isNaN(enterLon)) return;
        else getResponse(enterLat, enterLon);
    }
    
    return (
        
        <div class="main-div">
            <div className="heading">
                <h1>Check weather</h1>
            </div>
            <div className="enterdat">
                <h2>Enter longitude and latitude</h2>
            </div>
            <div className="container">
                <div className="input-group">
                    <span className="input-group-text">Latitude</span>
                    <input type="text" className="form-control" value={enterLat} onChange={(e)=>setEnterLat(e.target.value)}></input>
                </div>
            </div>
            <div className="container">
                <div className="input-group">
                    <span className="input-group-text">Longitude</span>
                    <input type="text" className="form-control" value={enterLon} onChange={(e)=>setEnterLon(e.target.value)}></input>
                </div>
            </div>
            <div className="container" id="btn_container">
                <button type="button" class="btn btn-primary" onClick={getWeatherData}>Search</button>
            </div>
            {
                (isNaN(enterLat) ||  isNaN(enterLon) || result.length===0) ? 
                (
                    <div className="container" id="wrong-input">
                        <h2>Please enter correct input</h2>
                    </div>
                ) : (
                    <>
                        <div className="container" id="correct-input">
                            <h1>Country: {result.sys.country}</h1>
                        </div>
                        <div className="container" id="city">
                            <h2>City: {result.name}</h2>
                        </div>
                        <div className="container" id="city">
                            <h4>Weather: {result.weather[0].description}</h4>
                        </div>
                        <div className="container" id="city">
                            <h4>Temp: {result.main.temp} K</h4>
                        </div>
                        <div className="container" id="city">
                            <h4>Pressure: {result.main.pressure} hPa</h4>
                        </div>
                        <div className="container" id="city">
                            <h4>Humidity: {result.main.humidity} %</h4>
                        </div>
                        <div className="container" id="city">
                            <h4>Wind speed: {result.wind.speed} m/sec</h4>
                        </div>
                    </>
                )
            }

        </div>
        
    );
}

export default App;