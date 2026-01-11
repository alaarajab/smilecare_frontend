import { useState } from "react";
import { useUser } from "../../context/UserContext";
import ItemCard from "../ItemCard/ItemCard";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "./Profile.css";

function Profile() {
  const { savedItems, removeSavedItem } = useUser();
  const [itemToDelete, setItemToDelete] = useState(null);
  // Collect keywords from saved item titles
  const keywords = savedItems.map((item) => item.title.toLowerCase());

  // Remove duplicates
  const uniqueKeywords = [...new Set(keywords)];

  // Display logic
  const visibleKeywords = uniqueKeywords.slice(0, 2);
  const remainingCount = uniqueKeywords.length - visibleKeywords.length;

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
  };

  const confirmDelete = () => {
    removeSavedItem(itemToDelete);
    setItemToDelete(null);
  };
  return (
    <div className="profile-page">
      {savedItems.length === 0 ? (
        <>
          <h1 className="profile-title">
            Alaa, you haven’t saved any items yet
          </h1>
          <p className="no-items">Start bookmarking cards to see them here.</p>
        </>
      ) : (
        <>
          <h1 className="profile-title">
            Alaa, you have {savedItems.length} saved{" "}
            {savedItems.length === 1 ? "item" : "items"}
          </h1>
          <p className="profile-subtitle">
            By keywords: {visibleKeywords.join(", ")}
            {remainingCount > 0 &&
              ` and ${remainingCount} other${remainingCount > 1 ? "s" : ""}`}
          </p>
          <div className="saved-cards">
            {savedItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                isProfile={true}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        </>
      )}

      <ConfirmModal
        isOpen={!!itemToDelete}
        onConfirm={confirmDelete}
        onClose={() => setItemToDelete(null)}
      />
    </div>
  );
}

export default Profile;
