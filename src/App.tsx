import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Nav from "./components/Layout/Nav";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import HabitForm from "./components/Pages/Form/Form";
import Knowledge from "./components/Pages/Knowledge/Knowledge";
import Profile from "./components/Pages/Profile/Profile";
import Tracker from "./components/Pages/Tracker/Tracker";

import Welcome from "./components/Pages/Welcome/Welcome";

function App() {
  const location = useLocation();
  const savedHabit = localStorage.getItem("habit");
  const withNav =
    (location.pathname !== "/" && location.pathname !== "/form") ||
    (location.pathname === "/" && savedHabit);

  return (
    <div className="App">
      {withNav && <Nav />}

      <Routes>
        <Route path="/" element={savedHabit ? <Dashboard /> : <Welcome />} />
        <Route path="/form" element={<HabitForm />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/knowledge" element={<Knowledge />} />
      </Routes>
    </div>
  );
}

export default App;
