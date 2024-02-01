import React from 'react';
import '../index'; 

// Spinner component for indicating loading state
const Spinner = () => {
  return (
    <div className="spinner-containers">
      {/* The actual spinner element */}
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
