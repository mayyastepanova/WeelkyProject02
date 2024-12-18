// src/pages/HomePage.js
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";

function HomePage() {
  const [videos, setVideos] = useState([]);

  return (
    <div>
      <SearchBar onSearch={setVideos} /> {/* Pass setVideos as onSearch */}
      <VideoList videos={videos} />
    </div>
  );
}

export default HomePage;