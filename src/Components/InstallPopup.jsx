import { useEffect, useState } from "react";
import logo from "/logo192.png"; 

export default function InstallPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true); 
  }, []);

  return showPopup ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        
        
        <img src={logo} alt="App Logo" className="w-14 h-14 mx-auto mb-3" />

      </div>
    </div>
  ) : null;
}
