import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled components
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: #fff;

  ${({ $variant }) =>
    $variant === "add"
      ? `
    background-color: #007BFF;
    &:hover {
      background-color: #0056b3;
    }
  `
      : `
    background-color: #DC3545;
    &:hover {
      background-color: #a71d2a;
    }
  `}
`;

function VideoList({ videos, onAddVideo, onRemoveVideo, onVideoClick }) {
  if (!videos || videos.length === 0) {
    return <p>No videos to display.</p>;
  }

  return (
    <div>
      {videos.map((video, index) => {
        
        const uniqueKey = video?.id?.videoId || `${video.title}-${index}`;
        console.log(video)
        return (
          <VideoItem
            to={`/video/${video?.id?.videoId}`}
            key={uniqueKey} 
            onClick={(e) => {
              if (onVideoClick) {
                e.preventDefault(); 
                onVideoClick(video.id.videoId); 
              }
            }}
          >
            <Thumbnail src={video.thumbnails?.url} alt={video.title} />
            <VideoDetails>
              <VideoTitle>{video.title}</VideoTitle>
              <ButtonContainer>
                {onAddVideo && (
                  <ActionButton
                    $variant="add"
                    onClick={(e) => {
                      e.preventDefault(); 
                      onAddVideo(video);
                    }}
                  >
                    Add to Playlist
                  </ActionButton>
                )}
                {onRemoveVideo && (
                  <ActionButton
                    $variant="remove"
                    onClick={(e) => {
                      e.preventDefault(); 
                      onRemoveVideo(video.id);
                    }}
                  >
                    Remove
                  </ActionButton>
                )}
              </ButtonContainer>
            </VideoDetails>
          </VideoItem>
        );
      })}
    </div>
  );
}

export default VideoList;
