const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS with specified options
const corsOptions = {
  origin: 'https://moneybank.cyclic.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));

// Use JSON and URL-encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Custom middleware to set Cache-Control header
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store');
  next();
});

// API and authentication routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Serve the React app's index.html for the root path
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html', function(err) {
    console.err(err)
  }));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
