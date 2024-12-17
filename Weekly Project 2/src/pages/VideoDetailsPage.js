// src/pages/VideoDetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";
import { getVideoDetails } from "../api";

function VideoDetailsPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getVideoDetails(videoId).then((data) => setVideo(data));
  }, [videoId]);

  // Search handler for updating search results
  const handleSearch = (results) => {
    setSearchResults(results);
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div>
      <VideoPlayer video={video} />
      <SearchBar onSearch={handleSearch} /> {/* Pass handleSearch as onSearch */}
      <VideoList videos={searchResults} />
    </div>
  );
}

export default VideoDetailsPage;