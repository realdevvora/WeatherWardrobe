import React, { useEffect, useState } from "react";

export default function Suggestions({ weather, location }) {
    const [suggestions, setSuggestions] = useState(null);
    
    useEffect(() => {
        async function fetchInfo() {
            if (weather && Object.keys(weather).length !== 0 && location && Object.keys(location).length !== 0) {
                try {
                    const response = await fetch('http://127.0.0.1:5000/obtainSuggestions/', {
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
    <>
        <h2>Suggestions:</h2>
        {suggestions === null ? (
            <p>Loading suggestions...</p>
        ) : (
            suggestions.map((suggestion, index) => (
                <p key={index}>{suggestion}</p>
            ))
        )}
    </>

    )
}
