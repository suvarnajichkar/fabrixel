import { useEffect, useState } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      console.log("✅ Install prompt event fired!");
      setDeferredPrompt(event); // Save the event
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
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
        📲 Install App
      </button>
    )
  );
}

