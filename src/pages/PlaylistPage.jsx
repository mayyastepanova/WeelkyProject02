import React, { useState } from "react";
import VideoList from "../components/VideoList";
import SearchBar from "../components/SearchBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import YouTube from "react-youtube";

function PlaylistPage() {
  const { playlistId } = useParams();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]); // State for search results

  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };

  const { data: playlistData, mutate } = useSWR(
    playlistId ? `https://harbour.dev.is/api/playlists/${playlistId}` : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  const currentVideo =
    playlistData?.videos?.length > 0
      ? playlistData.videos[currentVideoIndex]
      : null;

  const handleVideoEnd = () => {
    if (playlistData?.videos?.length > 0) {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex + 1 >= playlistData.videos.length ? 0 : prevIndex + 1
      );
    }
  };

  const addVideoToPlaylist = async (video) => {
    if (!playlistData) {
      console.error("No playlist data available.");
      return;
    }

    try {
      const updatedVideos = [
        ...playlistData.videos,
        {
          videoId: video.id.videoId,
          title: video.title,
          thumbnailUrl: `https://i.ytimg.com/vi/${video.id.videoId}/maxresdefault.jpg`,
        },
      ];

      // Send the updated videos array to the server
      await axios.put(`https://harbour.dev.is/api/playlists/${playlistId}`, {
        ...playlistData,
        videos: updatedVideos,
      });

      console.log("Video added successfully.");
      mutate(); // Refresh playlist data
    } catch (error) {
      console.error("Error adding video to playlist:", error);
    }
  };

  if (!playlistData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Playlist</h1>
      {currentVideo ? (
        <YouTube
          videoId={currentVideo.videoId}
          opts={{ playerVars: { autoplay: 1 } }}
          onEnd={handleVideoEnd}
        />
      ) : (
        <p>No video to play.</p>
      )}
      <h2>Search and Add Videos</h2>
      <SearchBar onSearch={setSearchResults} />
      <VideoList
        videos={searchResults}
        onAddVideo={(video) => {
          console.log("Adding video:", video);
          addVideoToPlaylist(video);
        }}
      />
      <h2>Playlist Videos</h2>
      <VideoList
        videos={playlistData.videos}
        onRemoveVideo={(videoId) => {
          const updatedVideos = playlistData.videos.filter(
            (video) => video.videoId !== videoId
          );
          axios
            .put(`https://harbour.dev.is/api/playlists/${playlistId}`, {
              ...playlistData,
              videos: updatedVideos,
            })
            .then(() => mutate())
            .catch((error) =>
              console.error("Error removing video from playlist:", error)
            );
        }}
      />
    </div>
  );
}

export default PlaylistPage;




