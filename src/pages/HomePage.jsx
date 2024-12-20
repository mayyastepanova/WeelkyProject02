import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import VideoList from "../components/VideoList";
import { createPlaylist, addVideoToPlaylist, getPlaylist } from "../api";
import { Link } from "react-router-dom";

function HomePage() {
  const [videos, setVideos] = useState([]);
  const homepageStyle = {
    backgroundColor: "6495ED", 
    height: "100vh", 
    display: "flex",
    alignItems: "center", 
    justifyContent: "center",
    flexDirection: "column", 
    paddingTop: "50",
    margin: 0, 
  };

  const [playlistId, setPlaylistId] = useState(null);

  const titleStyle = {
    fontSize: "60px", 
    color: "#ff7f7f", 
    marginBottom: "20px", 
    textAlign: "center", 
    position: "absolute", 
    top: "-60px",
    margin: "100px 500px",
    
  };

  useEffect(() => {
    
    createPlaylist({ name: "My Playlist" }).then((playlist) => {
      if (!playlist) return;
      if (playlist.status === false) return;
      setPlaylistId(playlist.id)
    });
  }, []);

  const handleAddVideo = (video) => {
    addVideoToPlaylist(playlistId, video).then(() => {
      setVideos((prev) => [...prev, video]); 
    });
  };

  

  return (
    <div>
      <SearchBar onSearch={setVideos} /> {/* Pass setVideos as onSearch */}
      <h1 style={titleStyle}>MyYouTube</h1>
      <VideoList videos={videos} onAddVideo={handleAddVideo} />
      <Link to="/playlist/ruz71LN7sBy8C1b5f6xvH">Go to playlist page</Link>
    </div>
  );
}

export default HomePage;