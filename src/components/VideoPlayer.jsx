// src/components/VideoPlayer.js
import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

function VideoPlayer({ video }) {
  if (!video) return <div>Loading...</div>;
  



const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const VideoFrame = styled.iframe`
  width: 80%;
  height: 450px;
`;



  const videoId = video.url.split('=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const handleVideoEnd = () => {
    console.log("Video ended");
    // Add logic for what happens when a video ends
  };
  


  


  return (
    <PlayerWrapper>
      <h1>{video.title || "Video"}</h1>
      <VideoPlayer video={video} onVideoEnd={handleVideoEnd} />
      <ReactPlayer
        url={video.url}
        controls
        playing
        onEnded={onVideoEnd} // Call onVideoEnd when the video ends
      />
    </PlayerWrapper>
  );
}

export default VideoPlayer;