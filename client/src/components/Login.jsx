import React, { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Header from './Header';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Link, Navigate } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';

const Login = () => {
  const { isDarkMode } = useDarkMode();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch user session on component mount
    axios.get('/auth/session').then(response => {
      setSession(response.data.session);
    });

    // Subscribe to auth state changes and update session
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const response = await axios.post('/auth/login', { provider: 'google' });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Header />
      <div className={`flex h-screen justify-between flex-col items-center py-20 ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
        {session ? (
          <div className='h-5/6 w-full flex items-center justify-center flex-col'>
            <p>Logged in!</p>
            <Link className='w-full text-center' to='/profile'>
              <Button>Click Here to Continue!</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Button onClick={loginWithGoogle}>Login with Google</Button>
            <Auth supabaseClient={supabase} providers={['google']} appearance={{ theme: ThemeSupa }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;