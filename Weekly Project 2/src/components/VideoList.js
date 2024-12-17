// src/components/VideoList.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const VideoItem = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 80px;
  margin-right: 10px;
  border-radius: 5px;
`;

const VideoDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

function VideoList({ videos }) {
  if (!Array.isArray(videos)) return <div>No videos available</div>;

  return (
    <div>
      {videos.map((video, index) => {
        const videoId = video.id?.videoId || video.id;
        return (
          <VideoItem key={videoId || index} to={`/video/${videoId}`}>
            {video.thumbnails?.url ? (
              <Thumbnail src={video.thumbnails.url} alt={video.title} />
            ) : (
              <div style={{ width: "120px", height: "80px", background: "#ccc" }} />
            )}
            <VideoDetails>
              <VideoTitle>{video.title || "No Title"}</VideoTitle>
              <span>Duration: {video.duration_raw || "N/A"}</span>
              <span>Channel: {video.channelName || "Unknown"}</span>
            </VideoDetails>
          </VideoItem>
        );
      })}
    </div>
  );
}

export default VideoList;