import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Bankcard from './Bankcard';

// Profile component representing the user profile page
function Profile() {
  // State to manage the visibility of the sidebar
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Function to toggle the visibility of the sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Render the profile page with header, sidebar, bankcard, and footer
  return (
    <div className="h-screen flex flex-col">
      {/* Header component with sidebar toggle button */}
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Render the sidebar if visible */}
        {sidebarVisible && <Sidebar />}

        {/* Render the Bankcard component */}
        <Bankcard />
      </div>

      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default Profile;
