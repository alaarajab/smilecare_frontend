import React, { useState } from "react";
import whiteBookmark from "../../assets/white_bluemarks.png"; // not saved
import blueBookmark from "../../assets/blue_bookmarks.png"; // saved
import { useUser } from "../../context/UserContext";
import "./ItemCard.css";

function ItemCard({ title, children, initiallySaved = false }) {
  const [saved, setSaved] = useState(initiallySaved);

  const handleBookmarkClick = () => {
    setSaved((prev) => !prev);
  };

  function capitalizeTitle(text) {
    if (!text) return "";
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <div className="card">
      <button
        className="card__bookmark"
        onClick={handleBookmarkClick}
        aria-label="Save card"
      >
        <img
          src={saved ? blueBookmark : whiteBookmark}
          alt={saved ? "Saved" : "Not saved"}
        />
      </button>

      <div className="card__content">
        <h3 className="card__title">{capitalizeTitle(title)}</h3>
        <div className="card__description">{children}</div>
      </div>
    </div>
  );
}

export default ItemCard;
