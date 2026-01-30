import { useState } from "react";
import { useUser } from "../../context/UserContext";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import ItemCard from "../ItemCard/ItemCard";
import "./Profile.css";

function Profile() {
  const { user, savedTips, removeSavedItem, loading } = useUser();
  const [itemToDelete, setItemToDelete] = useState(null);

  if (loading) {
    return <div className="profile-page">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="profile-page">
        <h1 className="profile-title">Please log in to view your profile</h1>
      </div>
    );
  }

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    await removeSavedItem(itemToDelete); // ✅ use remove instead of toggle
    setItemToDelete(null);
  };

  return (
    <div className="profile-page">
      {savedTips.length === 0 ? (
        <>
          <h1 className="profile-title">
            {user.name}, you haven’t saved any items yet
          </h1>
          <p className="no-items">Start bookmarking cards to see them here.</p>
        </>
      ) : (
        <>
          <h1 className="profile-title">
            {user.name}, you have {savedTips.length} saved{" "}
            {savedTips.length === 1 ? "item" : "items"}
          </h1>

          <div className="saved-cards">
            {savedTips.map((id) => (
              <ItemCard
                key={id}
                id={id}
                title={id}
                description=""
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
