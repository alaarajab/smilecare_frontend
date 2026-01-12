import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

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
    }
  }, [user]);

  // Persist saved items to localStorage
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSavedItem = (item) => {
    if (!user) {
      alert("Please log in to save items");
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

  const removeSavedItem = (id) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };
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
export function useUser() {
  return useContext(UserContext);
}
