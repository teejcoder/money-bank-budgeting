import React from "react";
import { CiLight, CiDark } from "react-icons/ci";
import { useDarkMode } from '../contexts/DarkModeContext';

const Header = () => {
  // Get dark mode state and toggle function from context
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // State for user display name, loading status, and error

  return (
    <div className={`h-20 w-full p-10 top-0 sticky border-b flex justify-between items-center ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
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
            <p>username</p>
          </div>        
        </div>
    </div>
  );
};

export default Header;
