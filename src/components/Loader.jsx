import React from "react";
import "../styles/loader.css";

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="dumbbell-loader rotating">
        <div className="bar"></div>
        <div className="weight left"></div>
        <div className="weight right"></div>
      </div>
      <p className="loading-text">Warming up your muscles...</p>
    </div>
  );
}
