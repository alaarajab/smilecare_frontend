import React from "react";
import whiteBookmark from "../../assets/white_bluemarks.png"; // not saved
import blueBookmark from "../../assets/blue_bookmarks.png"; // saved
import { useUser } from "../../context/UserContext";
import "./ItemCard.css";

function ItemCard({ id, title, description }) {
  // ✅ get data from context
  const { toggleSavedItem, isItemSaved } = useUser();

  // ✅ check if saved
  const saved = isItemSaved(id);

  // ✅ toggle using context
  const handleBookmarkClick = () => {
    toggleSavedItem({ id, title, description });
  };

  const capitalizeTitle = (text) =>
    text
      ? text
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ")
      : "";

  return (
    <div className="card">
      <button
        className="card__bookmark"
        onClick={handleBookmarkClick}
        aria-label={saved ? "Remove bookmark" : "Save card"}
      >
        <img
          src={saved ? blueBookmark : whiteBookmark}
          alt={saved ? "Saved" : "Not saved"}
        />
      </button>

      <div className="card__content">
        <h3 className="card__title">{capitalizeTitle(title)}</h3>

        {/* ✅ THIS is why description now appears */}
        <p className="card__description">{description}</p>
      </div>
    </div>
  );
}

export default ItemCard;
