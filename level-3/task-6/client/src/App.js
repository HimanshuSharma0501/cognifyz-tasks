import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [showRegister, setShowRegister] = useState(true);

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="container">
      <h1>Authentication App</h1>
      {showRegister ? (
        <Register toggleForm={toggleForm} />
      ) : (
        <Login toggleForm={toggleForm} />
      )}
    </div>
  );
}

export default App;
