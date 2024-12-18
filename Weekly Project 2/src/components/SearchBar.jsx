// src/components/SearchBar.js
import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (typeof onSearch === "function") {
      try {
        const response = await fetch(`https://harbour.dev.is/api/search?q=${query}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          onSearch(data); // Call the passed function with the video list
        } else {
          console.error("Unexpected API response format:", data);
          onSearch([]); // Pass an empty array on failure
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        onSearch([]); // Pass an empty array on error
      }
    } else {
      console.error("onSearch is not a function.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;