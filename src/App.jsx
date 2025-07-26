import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      {/* Nếu chưa đăng nhập, hiển thị trang Login */}
      <Route
        path="/"
        element={
          !username ? (
            <Login setUsername={setUsername} />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />

      {/* Nếu đã đăng nhập, cho vào Dashboard */}
      <Route
        path="/dashboard"
        element={username ? <Dashboard /> : <Navigate to="/" />}
      />

      {/* Chuyển các đường dẫn không hợp lệ về trang chủ */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
