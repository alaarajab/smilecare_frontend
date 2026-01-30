import React from "react";
import whiteBookmark from "../../assets/white_bluemarks.png";
import blueBookmark from "../../assets/blue_bookmarks.png";
import deleteIcon from "../../assets/delete.png";
import { useUser } from "../../context/UserContext";
import "./ItemCard.css";

function ItemCard({ id, title, description, isProfile = false, onDelete }) {
  const { toggleSavedItem, isItemSaved } = useUser();
  const saved = isItemSaved(id);

  const capitalizeTitle = (text) =>
    text
      ? text
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ")
      : "";

  return (
    <div className="card">
      {/* Show delete button only in profile */}
      {isProfile && onDelete && (
        <button
          className="card__delete"
          onClick={() => onDelete(id)}
          aria-label="Delete saved item"
        >
          <img src={deleteIcon} alt="Delete" />
        </button>
      )}

      {/* Bookmark button is hidden in profile */}
      {!isProfile && (
        <button
          className="card__bookmark"
          onClick={() => toggleSavedItem(id)}
          aria-label={saved ? "Remove bookmark" : "Save card"}
        >
          <img
            src={saved ? blueBookmark : whiteBookmark}
            alt={saved ? "Saved" : "Not saved"}
          />
        </button>
      )}

      <div className="card__content">
        <h3 className="card__title">{capitalizeTitle(title)}</h3>
        <p className="card__description">{description}</p>
      </div>
    </div>
  );
}

export default ItemCard;
