import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
      );
      const records = response.data.values.slice(1); // Ignore header row
      const results = records.filter((row) =>
        row.some((cell) => cell.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching data", error);
    }
  };

  return (
    <div>
      <h2>Search Records</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>

      <h3>Search Results</h3>
      <table>
        <thead>
          <tr>
            <th>Field 1</th>
            <th>Field 2</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result, index) => (
            <tr key={index}>
              <td>{result[0]}</td>
              <td>{result[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
