const { createServerClient } = require('@supabase/supabase-js');

const authController = {

  // Function to create Supabase client
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
};

module.exports = authController;
