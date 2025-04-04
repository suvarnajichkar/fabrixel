import { useEffect, useState } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log("Install prompt available");
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      alert('To install on iOS:\n1. Tap the Share button\n2. Select "Add to Home Screen"');
      return;
    }

    if (!deferredPrompt) {
      alert('Installation prompt not available.');
      return;
    }

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    setDeferredPrompt(null);
  };

  return (
    deferredPrompt && (
      <button
        onClick={handleInstall}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px 24px",
          background: "#2563eb",
          color: "white",
          borderRadius: "8px",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          zIndex: 9999,
        }}
      >
        {isIOS ? "📲 Add to Home Screen" : "📲 Install App"}
      </button>
    )
  );
}
