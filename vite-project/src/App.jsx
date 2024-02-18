import { useState, useEffect } from 'react';
import './App.css';
import Searchbar from './Searchbar';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/userData/', {
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
  
  return (
    <div className="App">
      <Searchbar data={data} />
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default App;
