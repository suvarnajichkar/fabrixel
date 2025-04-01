import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens, session, etc.)
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex min-h-screen font-sans relative">
      {/* Hamburger Menu Button */}
      <div
        className="absolute top-2.5 left-2.5 z-[1000] cursor-pointer"
        onClick={toggleSidebar}
      >
        <div className="text-2xl">☰</div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 border-r border-gray-200 transition-all duration-300 ease-in-out z-[1000] overflow-x-hidden ${
          isSidebarOpen ? "w-64" : "w-0"
        }`}
      >
        <div className="flex justify-between items-center px-5 pt-5">
          <h2 className="text-xl font-semibold m-0">FabTRK Dashboard</h2>
          <span
            className="text-3xl cursor-pointer"
            onClick={toggleSidebar}
          >
            ×
          </span>
        </div>
        <ul className="list-none p-0 m-0 mt-5">
          <li className="py-3 px-5 text-lg cursor-pointer hover:bg-gray-200">
            Cutting
          </li>
          <li className="py-3 px-5 text-lg cursor-pointer hover:bg-gray-200">
            Blasting
          </li>
          <li className="py-3 px-5 text-lg cursor-pointer hover:bg-gray-200">
            Painting
          </li>
          <li
            className="py-3 px-5 text-lg cursor-pointer hover:bg-gray-200"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-16"
        }`}
      >
        <header className="p-2.5 border-b border-gray-200">
          <h1 className="text-2xl font-semibold m-0 ml-7">FabTRK Dashboard</h1>
        </header>
        <div className="flex-1 flex justify-center items-center">
          <h2 className="text-3xl text-gray-700">Welcome to FabTRK</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;