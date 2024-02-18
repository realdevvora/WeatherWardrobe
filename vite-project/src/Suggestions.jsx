import React, { useEffect, useState } from "react";
import "./Suggestions.css"

export default function Suggestions({ weather, location }) {
    const baseURL = import.meta.env.VITE_DOMAIN;
    const [suggestions, setSuggestions] = useState(null);
    
    useEffect(() => {
        async function fetchInfo() {
            if (weather && Object.keys(weather).length !== 0 && location && Object.keys(location).length !== 0) {
                try {
                    const response = await fetch(`${baseURL}/obtainSuggestions/`, {
                        method: 'POST',
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        // You can pass data in the body of the request
                        body: JSON.stringify({ weather: weather, location: location}),
                    });
    
                    if (!response.ok) {
                        throw new Error('Network response was not okay');
                    }
                    
                    const data = await response.json(); // Convert response to string
                    // console.log(data)
                    setSuggestions(data.message.split("\n")); // Split the string into an array
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                }
            }
        }
        
        fetchInfo();
    }, [weather]); // Include weather in the dependency array to run the effect when weather changes

    return (
    <div className="suggestion-dropdown" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <h2>Suggestions:</h2>
        {suggestions === null ? (
            <p>Loading suggestions...</p>
        ) : (
            suggestions.map((suggestion, index) => (
                <p className="suggestion-key" key={index}>{suggestion}</p>
            ))
        )}
    </div>
    )
}
