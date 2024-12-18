// src/components/VideoPlayer.js
import React from "react";
import ReactPlayer from 'react-player';
import styled from "styled-components";

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

function VideoPlayer({ video }) {
  if (!video) return <div>Loading...</div>;

  const videoId = video.url.split('=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <PlayerWrapper>
      <h1>{video.title || "Video"}</h1>
      {/* <VideoFrame
        src={embedUrl}
        title={video.title}
        allowFullScreen
      ></VideoFrame> */}
      <ReactPlayer url={video.url} controls muted loop playsinline playing onReady={(player) => player.seekTo(0, 'seconds')} />
    </PlayerWrapper>
  );
}

export default VideoPlayer;