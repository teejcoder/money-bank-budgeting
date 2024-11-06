import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Link, Navigate } from 'react-router-dom';
import Button from '../components/Button';
import axios from 'axios';

const Login = () => {
  const { isDarkMode } = useDarkMode();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch user session on component mount
    axios.get('/auth/session').then(response => {
      setSession(response.data.session);
    });
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
        <Button onClick={loginWithGoogle}>Login with Google</Button>
        <Link to="/signup">Don't have an account? Sign up</Link>
      </div>
    </div>
  );
};

export default Login;