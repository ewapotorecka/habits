import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { RootState } from "./app/store";
import Nav from "./components/Layout/Nav";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import HabitForm from "./components/Pages/Form/Form";
import Knowledge from "./components/Pages/Knowledge/Knowledge";
import Profile from "./components/Pages/Profile/Profile";
import Tracker from "./components/Pages/Tracker/Tracker";
import { useSelector } from "react-redux";

import Welcome from "./components/Pages/Welcome/Welcome";
import HabitStrengthForm from "./components/Pages/Dashboard/HabitStrenghtForm/HabitStrengthForm";

function App() {
  const location = useLocation();
  const habit = useSelector((state: RootState) => state.habit);
  const isHabitSaved = !!habit.id;
  const withNav =
    (location.pathname !== "/" && location.pathname !== "/form") ||
    (location.pathname === "/" && isHabitSaved);

  return (
    <div className="App">
      {withNav && <Nav />}

      <Routes>
        <Route path="/" element={isHabitSaved ? <Dashboard /> : <Welcome />} />
        <Route path="/form" element={<HabitForm />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/strength" element={<HabitStrengthForm />} />
      </Routes>
    </div>
  );
}

export default App;
