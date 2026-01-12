import React from "react";
import "./Preloader.css";

function Preloader({ text = "Searching for news..." }) {
  return (
    <div className="preloader-container">
      <div className="circle-preloader"></div>
      <p className="preloader-text">{text}</p>
    </div>
  );
}

export default Preloader;
