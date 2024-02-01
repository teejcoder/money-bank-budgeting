import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Header from './Header';
import { useDarkMode } from '../contexts/DarkModeContext';

import { Link, Navigate } from 'react-router-dom';
import Button from './Button';

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  // Get dark mode state from context
  const { isDarkMode } = useDarkMode();

  // State to track user session
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch user session on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to auth state changes and update session
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Unsubscribe from auth state changes on component unmount
    return () => subscription.unsubscribe();
  }, []);

  // Function to handle Google login
  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google,', 
      options: {
        queryParams: {
          access_type: 'offline',
        },
      },
    });

    // Redirect to profile if login is successful
    if (!error && data) {
      return <Navigate to="/profile" />;
    }

    // If there was an error or no data, show the Auth component
    return <Auth supabaseClient={supabase} providers={['google']} appearance={{ theme: ThemeSupa }} />;
  };

  return (
    <div>
      <Header />
      <div className={`flex h-screen justify-between flex-col items-center py-20 ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
        {session ? (
          // Display content if the user is logged in
          <div className='h-5/6 w-full flex items-center justify-center flex-col'>
            <p>Logged in!</p>
            <Link className='w-full text-center' to='/profile'>
              <Button>Click Here to Continue!</Button>
            </Link>
          </div>
        ) : (
          // Display Auth component if the user is not logged in
          <Auth
            redirectTo="http://localhost:3000/profile"
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
            queryParams={{
              access_type: 'offline',
              prompt: 'consent',
              hd: 'domain.com',
            }}
            onClick={loginWithGoogle}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
