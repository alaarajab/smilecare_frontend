import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // Load saved items from localStorage
  const [savedItems, setSavedItems] = useState(() => {
    const saved = localStorage.getItem("savedItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist saved items
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

  // Toggle bookmark
  const toggleSavedItem = (item) => {
    setSavedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      return exists ? prev.filter((i) => i.id !== item.id) : [...prev, item];
    });
  };

  // Check if a card is saved
  const isItemSaved = (id) => savedItems.some((i) => i.id === id);

  return (
    <UserContext.Provider value={{ savedItems, toggleSavedItem, isItemSaved }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook to use context
export function useUser() {
  return useContext(UserContext);
}
