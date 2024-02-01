import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

const Button = ({ children, onClick }) => {
  // Get the dark mode state from the context
  const { isDarkMode } = useDarkMode();

  // Style for the button based on dark mode
  const buttonStyle = {
    backgroundColor: isDarkMode ? '#2EC0F9' : '#8447FF',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  // Render the button with the provided children and onClick handler
  return (
    <button style={buttonStyle} onClick={onClick} className='w-3/6 h-12 border m-5 text-sm md:text-2xl'>
      {children}
    </button>
  );
};

export default Button;
