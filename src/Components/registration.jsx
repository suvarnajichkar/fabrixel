import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaCog } from 'react-icons/fa';
import fabLogo from './images/fab-logo.png';

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const baseUrl = 'http://bat.localhost:8000';
    const url = `${baseUrl}/api/method/register`; // Adjust the endpoint as per your API

    setLoading(true);
    setError('');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          email,
          pwd: password,
        }),
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText, 'Status:', response.status);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error(`Invalid response format: ${responseText}`);
      }

      if (response.ok && data.message === 'Registered Successfully') {
        console.log('Registration Successful!', data);
        navigate('/'); // Navigate back to login page after successful registration
      } else {
        throw new Error(data.message || `Server error: ${response.status}`);
      }
    } catch (err) {
      console.error('Registration error:', err.message);
      setError(`Registration failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex-grow text-center">
            <img src={fabLogo} alt="FabTrk Logo" className="w-16 h-16 mx-auto" />
          </div>
          <FaCog
            className="text-xl text-gray-600 cursor-pointer hover:text-blue-500 transition-colors"
            onClick={handleSettingsClick}
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          FabTrk
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="text-gray-600 text-sm font-medium block mb-2">
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white">
              <FaUser className="text-gray-400 mr-2 text-lg" />
              <input
                type="text"
                placeholder="Enter username"
                className="w-full outline-none text-sm p-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-gray-600 text-sm font-medium block mb-2">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white">
              <FaEnvelope className="text-gray-400 mr-2 text-lg" />
              <input
                type="email"
                placeholder="Enter email"
                className="w-full outline-none text-sm p-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-gray-600 text-sm font-medium block mb-2">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white">
              <FaLock className="text-gray-400 mr-2 text-lg" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full outline-none text-sm p-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="text-gray-400 cursor-pointer ml-2 text-lg"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="text-gray-400 cursor-pointer ml-2 text-lg"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors uppercase ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-gray-600 text-sm text-center mt-4">
  Not a user?{' '}
  <span
    onClick={() => navigate('/registration')}  // Removed the extra space
    className="text-blue-600 cursor-pointer hover:underline"
  >
    Sign Up now
  </span>
</p>
      </div>
    </div>
  );
};

export default Registration;