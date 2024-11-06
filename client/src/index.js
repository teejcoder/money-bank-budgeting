import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './App';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import { DarkModeProvider } from './contexts/DarkModeContext';


// Create a browser router with defined routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
    errorElement: <ErrorPage />,
  },
]);

// Create a root instance for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app within StrictMode and wrapped in DarkModeProvider and RouterProvider
root.render(
  <React.StrictMode>
    {/* Provide dark mode context to the entire app */}
    <DarkModeProvider>
      {/* Provide routing functionality to the app */}
      <RouterProvider router={router} />
    </DarkModeProvider>
  </React.StrictMode>
);
