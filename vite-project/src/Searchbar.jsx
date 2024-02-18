import React, { useState, useEffect } from 'react';
import "./Searchbar.css"

const SearchBar = ({ data, onSelectLocation }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // Function to handle user input change
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setShowDropdown(true);
  };

  // Function to handle click on a filtered result
  const handleClick = (entry) => {
    setSearchInput('');
    onSelectLocation(entry.merged_column); // Pass the selected location to the parent component
  };

  // Function to filter the dataset based on user input
  useEffect(() => {
    const input = searchInput.toLowerCase();
    if (!input) {
      setFilteredData([]);
      setShowDropdown(false);
      return;
    }
    const filtered = data.filter((entry) => {
      const mergedTerms = entry.merged_column.toLowerCase().split(',').map(term => term.trim());
      return mergedTerms.some(term => term.includes(input));
    });

    setFilteredData(filtered);
  }, [searchInput]);

  return (
    <div className="search--bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={searchInput}
        className="search--box"
      />

      {showDropdown && (
        <div className="dropdown">
          {filteredData.length > 0 ? (
            filteredData.map((entry, index) => (
              <div className="search--box--course" key={index} onClick={() => handleClick(entry)}>
                <p>{entry.merged_column}</p>
              </div>
            ))
          ) : (
            <p>No matching results</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
