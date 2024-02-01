import React from 'react';
import { supabase } from '../config/supabaseClient';

// Signout component for user logout
const Signout = () => {

  // Function to handle user signout
  async function signOut() {
    // Attempt to sign out using Supabase authentication
    const { error } = await supabase.auth.signOut();
    
    // Handle errors if any (not shown in UI for simplicity)
    if (error) {
      console.error('Error during sign out:', error);
    }
  }
  
  // Render a clickable element to trigger the signout function
  return (
    <div onClick={signOut}>Signout</div>
  );
}

export default Signout;
