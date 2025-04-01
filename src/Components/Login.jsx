import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaCog } from "react-icons/fa";
import fabLogo from "./images/fab-logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const serverUrl = localStorage.getItem("serverUrl");
    if (!serverUrl) {
      setError("Server URL is not configured. Please set it first!");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const serverUrl = localStorage.getItem("serverUrl");
    if (!serverUrl) {
      setError("Please configure the server URL first!");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${serverUrl}/api/method/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ usr: email, pwd: password }),
      });

      const data = await response.json();
      if (response.ok && data.message === "Logged In") {
        navigate("/dashboard");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      setError(`Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center w-full mb-4">
          <img src={fabLogo} alt="FabTrk Logo" className="w-16 h-16 mx-auto" />
          <FaCog
            className="text-xl cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/settings")}
          />
        </div>
        <h1 className="text-3xl font-bold text-center">FabTrk</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm">User</label>
            <div className="flex border p-2 rounded">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                className="w-full outline-none"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm">Password</label>
            <div className="flex border p-2 rounded">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(false)}
                  className="cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(true)}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
