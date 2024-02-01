import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`h-screen text-5xl flex flex-col items-center justify-start ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
      
      <div className='w-full text-center flex flex-col items-center pt-10'>
        <div className='h-auto w-full sm:h-4/6 sm:w-3/6 sm:mb-10 flex items-center justify-center'>
          <img src="/assets/hero-image.png" alt="Hero banner" />
        </div>
        <p className='w-full'>
          Welcome to your financial future!
        </p>
        <div className='text-2xl w-full'>
          <Link to='/login'>
            <Button backgroundColor={'#2EC0F9'}>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
