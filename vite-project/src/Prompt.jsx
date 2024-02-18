import React, { useEffect, useState } from "react";
import Suggestions from "./Suggestions";

export default function Prompt({ location }) {
    const apiKey = import.meta.env.VITE_WEATHERWARDROBE;
    const searchText = location; // Example search text, replace with your actual search query
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?q=${searchText}&apikey=${apiKey}`;
    
    const [locationKey, setLocationKey] = useState("");
    const [weather, setWeather] = useState({});

    useEffect(() => {
        async function apiCalls() {
            try {
                const response = await fetch(url, {
                    mode: "cors",
                });
                if (!response.ok) {
                    throw new Error('Network response was not okay');
                }
                const data = await response.json();
                // Handle the response data here
                setLocationKey(data[0].Key);
                // console.log(data[0].Key);
            } catch (error) {
                // Handle errors here
                setLocationKey("");
                console.error('There was a problem with the fetch operation:', error);
            }
        }
    
        async function newCalls() {
            try {
                if (locationKey) {
                    const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`, {
                        mode: "cors",
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    // Handle the response data here

                    setWeather({
                        "weatherDescription": data[0].WeatherText, 
                        "weatherTemperature": data[0].Temperature.Metric.Value, 
                        "hasPrecipitation": data[0].HasPrecipitation,
                    }); // Assuming data is an array

                    // console.log(data);
                }
            } catch (error) {
                setWeather({});
                console.error('There was a problem with the fetch operation:', error);
            }
        }
    
        async function fetchData() {
            await apiCalls();
            await newCalls();
        }
    
        fetchData();
    
    }, [locationKey]); // Include locationKey in the dependency array
    
    return (
        <>
            <h2>
                It is currently {weather.weatherTemperature} ° C, {weather.weatherDescription}, {weather.hasPrecipitation ? <p>with precipitation</p>: <p>no precipitation</p>} in: {location}
            </h2>
            {weather && <Suggestions weather={weather} location={location}/>}
        </>
    )
}
