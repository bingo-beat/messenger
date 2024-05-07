import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import ChatRoom from "./ChatRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./reducer";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_Body">
          <Router>
            <Sidebar />

            <Routes>
              <Route path="/rooms/:roomId" element={<ChatRoom />} />
              <Route path="/" element={<ChatRoom />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
