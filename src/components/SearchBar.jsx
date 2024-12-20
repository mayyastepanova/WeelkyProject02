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

  // Inline styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "center",
    width: "100%",
    maxWidth: "900px",
    margin: "100px 250px", 
    
  };

  const inputStyle = {
    flex: 1,
    padding: "20px",
    fontSize: "20px",
    borderRadius: "35px",
    border: "2px solid #ccc",
    marginRight: "50px", 
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const buttonStyle = {
    padding: "20px 40px",
    fontSize: "20px",
    borderRadius: "35px",
    border: "none",
    backgroundColor: "#ff7f7f",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos..."
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#ff7f7f")}
        onBlur={(e) => (e.target.style.borderColor = "#ccc")}
      />
      <button
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#e06666")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ff7f7f")}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;