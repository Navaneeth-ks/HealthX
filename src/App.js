import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import WorkoutSelect from "./pages/WorkoutSelect";
import SensorGuide from "./pages/SensorGuide";
import Calibration from "./pages/Calibration";
import Camera from "./pages/Camera";
import Summary from "./pages/Summary";

import Rehab from "./pages/Rehab";
import RehabGoal from "./pages/RehabGoal";
import RehabLegGuide from "./pages/RehabLegGuide";
import RehabArmGuide from "./pages/RehabArmGuide";
import RehabCalibration from "./pages/RehabCalibration";
import RehabSummary from "./pages/RehabSummary"; // ✅ ADD THIS

function App() {
  return (
    <Router>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* USER PROFILE */}
        <Route path="/details" element={<UserDetails />} />

        {/* NORMAL EXERCISE MODE */}
        <Route path="/workout" element={<WorkoutSelect />} />
        <Route path="/guide" element={<SensorGuide />} />
        <Route path="/calibration" element={<Calibration />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/summary" element={<Summary />} />

        {/* REHAB MODE (COMPLETELY SEPARATE FLOW) */}
        <Route path="/rehab" element={<Rehab />} />
        <Route path="/rehab-goal" element={<RehabGoal />} />
        <Route path="/rehab-leg-guide" element={<RehabLegGuide />} />
        <Route path="/rehab-arm-guide" element={<RehabArmGuide />} />
        <Route path="/rehab-calibration" element={<RehabCalibration />} />
        <Route path="/rehab-summary" element={<RehabSummary />} /> {/* ✅ REQUIRED */}
      </Routes>
    </Router>
  );
}

export default App;
