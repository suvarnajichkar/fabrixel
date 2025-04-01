import React from 'react';
import { FaBars, FaHome } from 'react-icons/fa'; // We'll use react-icons for icons
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu-icon">
        <FaBars size={24} />
      </div>
      <div className="home-icon">
        <FaHome size={24} />
      </div>
    </div>
  );
};

export default Sidebar;