// src/api.js
export const searchVideos = async (query) => {
    try {
      const response = await fetch(`https://harbour.dev.is/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
  
      if (Array.isArray(data)) {
        return data;
      } else {
        console.error("API returned non-array data:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      return [];
    }
  };
  
  export const getVideoDetails = async (videoId) => {
    try {
      const response = await fetch(`https://harbour.dev.is/api/videos/${encodeURIComponent(videoId)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching video details:", error);
      return null;
    }
  };