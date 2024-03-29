import { useState, useEffect } from 'react';
import './App.css';
import Searchbar from './Searchbar';
import Prompt from './Prompt'; // Assuming this is the correct import path for the Prompt component

function App() {
  const baseURL = import.meta.env.VITE_DOMAIN;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(''); // State to store the selected location

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/userData/`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const jsonData = await response.json(); // Parse JSON data
        setData(jsonData); // Set data state to the received JSON data
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  // Function to handle selecting a location
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };
  
  return (
    <div className="App container">
      <a href="/">
      <img src="wwlogo.svg" className='logo' alt="" />
      </a>
      <h1 className='title'>WeatherWardrobe</h1>
      {!selectedLocation && <Searchbar data={data} onSelectLocation={handleSelectLocation} /> }{/* Pass onSelectLocation function to SearchBar */}
      {selectedLocation && <Prompt location={selectedLocation} />} {/* Pass selectedLocation state to Prompt */}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default App;
