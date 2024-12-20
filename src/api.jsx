import axios from "axios";

export const createPlaylist = async (playlistData) => {
  try {
    const response = await fetch("https://harbour.dev.is/api/playlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlistData),
    });

    if (!response.ok) {
      throw new Error("Failed to create playlist.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createPlaylist:", error);
    throw error;
  }
};


export const getVideoDetails = async (videoId) => {
  try {
    const response = await fetch(`https://harbour.dev.is/api/videos/${videoId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch video details.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
};

export const addVideoToPlaylist = async (playlistId, video) => {
  const url = `${playlistId}`;
  const repsonse = await axios.put(url, {

  })
};

export const removeVideoFromPlaylist = async (playlistId, videoId) => {
  try {
    const response = await fetch(
      `https://harbour.dev.is/api/playlists/${playlistId}/videos/${videoId}`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw new Error("Failed to remove video from playlist.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in removeVideoFromPlaylist:", error);
    throw error;
  }
};

export const searchVideos = async (query) => {
  // API logic for searching videos
};

export const getPlaylist = async (playlistId) => {
  // API logic for fetching a playlist
};
