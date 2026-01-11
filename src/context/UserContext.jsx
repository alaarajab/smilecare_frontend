import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // ✅ User state
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ Saved items
  const [savedItems, setSavedItems] = useState(() => {
    const saved = localStorage.getItem("savedItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      setSavedItems([]); // optional: clear saved items on logout
    }
  }, [user]);

  // Persist saved items to localStorage
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

  // ✅ Login function
  const login = (userData) => {
    setUser(userData);
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
  };

  // ✅ Toggle bookmark
  const toggleSavedItem = (item) => {
    if (!user) {
      alert("Please log in to save items"); // <-- prevent saving if not logged in
      return;
    }

    setSavedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      const newItems = exists
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item];

      console.log("Updated savedItems:", newItems);
      return newItems;
    });
  };

  // ✅ Remove saved item explicitly
  const removeSavedItem = (id) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Check if a card is saved
  const isItemSaved = (id) => savedItems.some((i) => i.id === id);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        savedItems,
        toggleSavedItem,
        removeSavedItem,
        isItemSaved,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Hook to use context
export function useUser() {
  return useContext(UserContext);
}
