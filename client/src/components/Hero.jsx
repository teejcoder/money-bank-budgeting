import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero = () => {

  return (
    <div className="h-screen w-full text-center flex flex-col items-center pt-10 text-5xl flex flex-col items-center justify-start">
      <img src="/assets/hero-image.png" alt="Hero banner" />

      <p className='w-full'>
        Welcome to your financial future!
      </p>
      <div className='text-2xl w-full'>
        <Link to='/login'>
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
