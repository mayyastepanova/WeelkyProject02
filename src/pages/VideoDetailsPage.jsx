
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideoDetails } from "../api";

function VideoDetailsPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideoDetails(videoId);
        setVideo(data);
        console.log(data)
      } catch (err) {
        setError("Failed to load video details.");
        console.error(err);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{video.title}</h1>
      <iframe id="player" type="text/html" width="640" height="360"
  src={`http://www.youtube.com/embed/${videoId}`}
  frameborder="0"></iframe>
      <p>{video.description}</p>
    </div>
  );
}

export default VideoDetailsPage;
