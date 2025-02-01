import React, { createContext, useState, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// UserProvider wraps the app to provide user data to all components
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access to UserContext
const useUser = () => {
  return useContext(UserContext);
};

export { useUser }