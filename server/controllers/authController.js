const { createServerClient } = require('@supabase/ssr');
const axios = require('axios');
require('dotenv').config();

const authController = {

  // Function to create Supabase client for server-side rendering
  createClient: async (context) => {
    return createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY, {
      cookies: {
        get: (key) => {
          // Get a cookie value from the request
          const cookies = context.req.cookies;
          const cookie = cookies[key] ?? '';
          return decodeURIComponent(cookie);
        },
        set: (key, value, options) => {
          // Set a cookie in the response
          if (!context.res) return;
          context.res.cookie(key, encodeURIComponent(value), {
            ...options,
            sameSite: 'Lax',
            httpOnly: true,
          });
        },
        remove: (key, options) => {
          // Remove a cookie from the response
          if (!context.res) return;
          context.res.cookie(key, '', { ...options, httpOnly: true });
        },
      },
    });
  },

  // Login route handler
  login: async (req, res) => {
    try {
      console.log('Login successful');
      // Respond with a JSON indicating successful login
      return res.json({ message: 'Login successful', user: req.user });
    } catch (error) {
      // Handle errors during login
      console.error('Error during login:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Logout route handler
  logout: async (req, res) => {
    try {
      // Attempt to sign out the user from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Respond with a JSON indicating successful logout
      res.json({ message: 'Logout successful' });
    } catch (error) {
      // Handle errors during logout
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
};

module.exports = authController;
