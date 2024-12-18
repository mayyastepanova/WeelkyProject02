import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VideoDetailsPage from "./pages/VideoDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/video/:videoId" element={<VideoDetailsPage />} />
    </Routes>
  );
}

export default App;

