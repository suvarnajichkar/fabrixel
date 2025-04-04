import { useEffect, useState } from "react";
import logo from "/logo192.png";

export default function InstallPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [appInfo, setAppInfo] = useState({ name: "Loading...", description: "Fetching details..." });

  useEffect(() => {
   
    fetch("/manifest.json")
      .then((response) => {
        console.log("Fetching manifest.json:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Manifest Data:", data);
        setAppInfo({ name: data.name, description: data.description });
      })
      .catch((error) => console.error("Manifest fetch error:", error));

   
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowPopup(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      console.log("🎉 App Installed!");
    }
    setShowPopup(false);
  };

  return showPopup ? (
    <div className="fixed inset-0 flex items-start justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
      
        <img src={logo} alt="App Logo" className="w-14 h-14 mx-auto mb-3" />

       
        <h2 className="text-xl font-semibold">{appInfo.name}</h2>

       
        <p className="text-gray-600 text-sm mt-1">{appInfo.description}</p>

        
        <button
          onClick={handleInstall}
          className="bg-black text-white w-full py-2 rounded-lg text-lg mt-4 flex items-center justify-center"
        >
          ⬇ Install
        </button>
      </div>
    </div>
  ) : null;
}
