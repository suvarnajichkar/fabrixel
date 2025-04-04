import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "./Components/Spinner";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Settings from "./Components/Settings";
import Registration from "./Components/Registration";
import InstallPopup from "./Components/InstallPopup"; // 

const App = () => {
  return (
    <Router basename="/fabrixel/">
      <div style={{ padding: "10px", textAlign: "center" }}>
        <InstallPopup />
      </div>

      <Routes>
        <Route path="/" element={<Spinner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;
