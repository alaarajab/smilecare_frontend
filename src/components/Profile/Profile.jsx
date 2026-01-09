import React from "react";
import { useUser } from "../../context/UserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./Profile.css";

function Profile() {
  const { savedItems } = useUser();

  return (
    <div className="profile-page">
      <h1 className="profile-title">Alaa's Saved Items</h1>

      {savedItems.length === 0 ? (
        <p className="no-items">No saved cards yet.</p>
      ) : (
        <div className="saved-cards">
          {savedItems.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description} // ✅ Show description
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
