import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import HabitForm from "./components/Pages/Form/Form";
import Form from "./components/Pages/Form/Form";
import Welcome from "./components/Pages/Welcome/Welcome";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/form">Form</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/form" element={<HabitForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
