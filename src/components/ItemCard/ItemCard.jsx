import React, { useState } from "react";
import closeIcon from "../../assets/closeIcon_white_bluemarks.png"; // not saved
import blueBookmarkIcon from "../../assets/blue_bookmarks.png"; // saved
import "./ItemCard.css";

function ItemCard({ title, description, initiallySaved = false }) {
  const [saved, setSaved] = useState(initiallySaved);

  const handleBookmark = () => {
    setSaved((prev) => !prev);
  };

  return (
    <div className="card">
      {/* Bookmark button */}
      <button className="card__bookmark" onClick={handleBookmark}>
        <img
          src={saved ? blueBookmarkIcon : closeIcon}
          alt={saved ? "Saved" : "Save"}
        />
      </button>

      {/* Content */}
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
      </div>
    </div>
  );
}

export default ItemCard;
