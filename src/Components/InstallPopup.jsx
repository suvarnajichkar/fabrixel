import { useEffect, useState } from "react";

export default function InstallPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      console.log("✅ Install prompt event fired!");
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
      console.log("🎉 User installed the app!");
    } else {
      console.log("❌ User dismissed install.");
    }

    setDeferredPrompt(null);
    setShowPopup(false);
  };

  return showPopup ? (
    <div className="fixed bottom-5 right-5 bg-white p-4 shadow-lg rounded-lg border border-gray-200 animate-fadeIn">
      <p className="text-gray-800 font-semibold">📲 Install Fabrixel App</p>
      <p className="text-gray-600 text-sm">Get quick access to Fabrixel with our PWA.</p>
      <div className="mt-3 flex justify-end space-x-2">
        <button
          onClick={() => setShowPopup(false)}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Later
        </button>
        <button
          onClick={handleInstall}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          Install
        </button>
      </div>
    </div>
  ) : null;
}
