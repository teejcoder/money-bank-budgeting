import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { CiLight, CiDark } from "react-icons/ci";
import { useDarkMode } from '../contexts/DarkModeContext';

const Header = ({ toggleSidebar }) => {
  // Get dark mode state and toggle function from context
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // State for user display name, loading status, and error
  const [userDisplayName, setUserDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data on component mount
    const displayUserName = async () => {
      if (supabase.auth) {
        try {
          // Get user data from Supabase
          const { data: { user }, error } = await supabase.auth.getUser();

          // Update user display name or set to empty string
          if (user) {
            setUserDisplayName(user.user_metadata.full_name);
          } else {
            setUserDisplayName('');
          }

          // Set error if there's an issue fetching user data
          if (error) {
            setError(error.message);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          setError('An error occurred while fetching user data.');
        } finally {
          setLoading(false);
        }
      }
    };
    displayUserName();
  }, []);

  return (
    <div className={`h-20 w-full p-10 top-0 sticky border-b flex justify-between items-center ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
      {/* Toggle Sidebar Button */}
      {isDarkMode ? 
      (
        <button onClick={toggleSidebar} className="text-4xl md:text-5xl">
        <img className='h-24' src="./assets/logo-dark.png" alt="Money Bank light mode logo" />
        </button>
      ) : (
        <button onClick={toggleSidebar} className="text-4xl md:text-5xl">
        <img className='h-24' src="./assets/logo-light.png" alt="Money Bank dark mode logo" />
        </button>
      )}

      {/* Loading or Display User Information */}
      {loading ? (
        <p className='pr-4'>Loading...</p>
      ) : (
        <div className={`flex items-center justify-center pr-4`}>
          {/* Dark Mode Toggle Button */}
          <button className="w-20 mr-5 content-end focus:outline-none" onClick={toggleDarkMode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`h-8 w-8 mx-auto ${isDarkMode ? 'text-dark' : 'text-light'}`}
            >
              {/* Display 'On' or 'Off' based on dark mode state */}
              {isDarkMode ? 'On' : 'Off'}
              {isDarkMode ? <CiLight color='#2EC0F9' size='26px'/> : <CiDark color='#8447FF' size='26px'/>}
            </svg>
          </button>
          
          {/* Display User's Name or a Greeting */}
          <div className={`${isDarkMode ? 'text-dark' : 'text-light'}`}>
            <p>{userDisplayName ? `${userDisplayName}` : 'Hi'}</p>
          </div>        
        </div>
      )}
    </div>
  );
};

export default Header;
