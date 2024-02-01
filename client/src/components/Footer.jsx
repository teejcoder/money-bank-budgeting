import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`h-24 p-10 w-full flex justify-between items-center border-t z-50 ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>

      <div className='w-auto'>
      {isDarkMode ? 
      (
        <img className='h-24' src="./assets/logo-dark.png" alt="Money Bank light mode logo" />
      ) : (
        <img className='h-24' src="./assets/logo-light.png" alt="Money Bank dark mode logo" />
      )}
      </div>

      <div>
        <p>&copy; 2024 Money Bank</p>
      </div>      
    </div>
  );
};

export default Footer;