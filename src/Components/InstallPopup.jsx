import { useEffect, useState } from "react";
import logo from "/logo192.png"; 

export default function InstallPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true); 
  }, []);

  return showPopup ? (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border border-gray-300 rounded-lg p-4 w-80 flex items-center space-x-3 animate-fadeIn">
      
      {/* ✅ App Logo */}
      <img src={logo} alt="App Logo" className="w-12 h-12" />

    </div>
  ) : null;
}
