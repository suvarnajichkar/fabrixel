import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fabLogo from "./images/fab-logo.png";

const Spinner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img
        src={fabLogo}
        alt="Loading..."
        className="w-24 h-24 animate-spin"
      />
      <h1 className="text-2xl font-bold mt-2.5">Fab-Trak</h1>
    </div>
  );
};

export default Spinner;