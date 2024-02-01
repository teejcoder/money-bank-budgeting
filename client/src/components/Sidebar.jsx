import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import { LuLogOut, LuUser2 } from 'react-icons/lu';
import { MdOutlineSummarize } from "react-icons/md";
import { useDarkMode } from '../contexts/DarkModeContext';

// Sidebar component for user navigation and settings
const Sidebar = () => {
  // State to manage the logout status
  const [logoutStatus, setLogoutStatus] = useState(false);

  // React Router's navigate function
  const navigate = useNavigate();

  // Dark mode context for theme management
  const { isDarkMode } = useDarkMode();

  // Handle user logout
  const handleLogout = async () => {
    // Attempt to sign out using Supabase authentication
    const { error } = await supabase.auth.signOut();

    // Handle errors or navigate to the home page on successful logout
    if (error) {
      console.error('Error logging out user', error);
    } else {
      // Delay the navigation to give time for the logout process
      setTimeout(() => {
        navigate('/');
        setLogoutStatus(true);
      }, 0);
    }
  };

  // Render the Sidebar component with user settings, transactions, and logout buttons
  return (
    <aside className={`fixed top-0 mt-20 h-52 w-full xl:h-full xl:w-24 flex flex-col justify-between border-b sm:border-r z-50 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>

      <div className="mt-5">
        {/* User settings icon */}
        <button 
          className={'w-full p-4 focus:outline-none hover:bg-btnLight'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mx-auto"
          >
            <LuUser2 size='26px' color={isDarkMode ? '#fff' : '#000'} />
          </svg>
        </button>

        {/* Transactions Icon */}
        <button 
          className={'w-full p-4 focus:outline-none hover:bg-btnLight'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mx-auto"
          >
            <MdOutlineSummarize size='26px' color={isDarkMode ? '#fff' : '#000'} />
          </svg>
        </button>

        {/* Logout Icon */}
        <button
          onClick={handleLogout}
          className={'w-full p-4 focus:outline-none hover:bg-btnLight'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mx-auto"
          >
            <LuLogOut size='26px' color={isDarkMode ? '#fff' : '#000'} />
          </svg>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
