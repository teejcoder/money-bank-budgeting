import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './config/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to check if the user is authenticated
  const isAuthenticated = !!user;

  // Function to handle login
  const login = async () => {
    try {
      const { user, error } = await supabase.auth.signIn();
      if (error) throw error;
      setUser(user);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Effect to check the user's authentication status on mount
  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user || null);
  }, []);

  // Provide the context value to the children
  const contextValue = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
