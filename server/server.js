const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const __dirname = path.resolve()

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

// Use JSON and URL-encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, './client/build')));

// Custom middleware to set Cache-Control header
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store');
  next();
});

// API and authentication routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Serve the React app's index.html for the root path
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'), function (err) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
