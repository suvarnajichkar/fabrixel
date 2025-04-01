import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [url, setUrl] = useState(localStorage.getItem("serverUrl") || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidFabrixcelUrl = (url) => {
    const pattern = /^https?:\/\/[\w.-]+(:\d+)?\/?$/;
    return pattern.test(url);
  };

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const verifyUrl = async () => {
    try {
      const formattedUrl = url.trim().replace(/\/$/, ""); // Remove trailing slash
      if (!isValidFabrixcelUrl(formattedUrl)) {
        throw new Error("Invalid server URL format!");
      }

      const response = await fetch(`${formattedUrl}/api/method/ping`);
      if (!response.ok) {
        throw new Error("Server not reachable!");
      }

      return true;
    } catch (err) {
      console.error("URL verification failed:", err);
      return false;
    }
  };

  const handleSave = async () => {
    if (!url.trim()) {
      setError("Please enter a valid server URL!");
      return;
    }

    const formattedUrl = url.trim().replace(/\/$/, "");

    if (!isValidFabrixcelUrl(formattedUrl)) {
      setError("Invalid URL! Please enter a correct Fabrixcel ERP URL.");
      return;
    }

    const isValid = await verifyUrl();
    if (!isValid) {
      setError("Server not reachable. Please check the URL.");
      return;
    }

    localStorage.setItem("serverUrl", formattedUrl);
    alert("Server URL saved successfully!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/10">
      <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-md p-4 font-sans">
        <div className="flex justify-between items-center p-2 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
          <button
            className="bg-transparent border-none text-xl cursor-pointer text-gray-700"
            onClick={() => navigate("/login")}
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <label className="block mb-2 text-sm text-gray-600 uppercase">
            Server URL
          </label>
          <input
            type="text"
            placeholder="Enter Fabrixcel ERP URL"
            className="w-full p-2 mb-3 border border-gray-300 rounded-lg box-border"
            value={url}
            onChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="w-full p-2 bg-blue-600 text-white rounded-lg text-base cursor-pointer hover:bg-blue-700 transition-colors mt-3"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
