import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for managing dark mode state
const DarkModeContext = createContext();

// DarkModeProvider component to wrap your application and provide dark mode functionality
export const DarkModeProvider = ({ children }) => {
  // State to track whether dark mode is enabled or not
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage for the dark mode status, default to false if not found
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  // Effect to update local storage whenever the dark mode status changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Provide the dark mode state and toggle function to the context
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to easily consume dark mode context in components
export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
