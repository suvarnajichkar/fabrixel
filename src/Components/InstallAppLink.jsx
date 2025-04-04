import { useEffect, useState } from "react";

export default function InstallAppLink() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      console.log("✅ Install prompt event stored!");
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const requestNotificationPermission = async () => {
    if (Notification.permission === "granted") {
      console.log("🔔 Notification permission already granted");
      return true;
    }
    if (Notification.permission === "denied") {
      alert("Please enable notifications in browser settings.");
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === "granted";
  };

  const handleInstall = async () => {
    const isNotificationAllowed = await requestNotificationPermission();
    if (!isNotificationAllowed) {
      alert("You need to allow notifications to install the app.");
      return;
    }

    if (!deferredPrompt) {
      alert("Install option is not available right now.");
      return;
    }

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
    <a 
      href="#" 
      onClick={handleInstall} 
      style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
    >
      📲 Install Fabrixel App
    </a>
  );
}
