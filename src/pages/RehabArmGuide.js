import { useNavigate } from "react-router-dom";
import shoulderXray from "../assets/shoulder-xray.jpg";

function RehabArmGuide() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Arm / Shoulder Rehab – EMG Placement</h2>

      <p style={styles.subtitle}>
        Follow the placement carefully to avoid strain or injury
      </p>

      {/* IMAGE */}
      <img
        src={shoulderXray}
        alt="Shoulder EMG Placement"
        style={styles.image}
      />

      {/* INSTRUCTIONS */}
      <ul style={styles.list}>
        <li>Place EMG sensor on the muscle belly</li>
        <li>Recommended muscles: <b>Biceps</b> or <b>Deltoid</b></li>
        <li>Avoid elbow and shoulder joints</li>
        <li>Use slow, controlled arm raises</li>
        <li>Stop immediately if pain occurs</li>
      </ul>

      {/* ✅ REHAB FLOW CONTINUES HERE */}
      <button
        style={styles.btn}
        onClick={() => navigate("/rehab-calibration")}
      >
        CONTINUE TO REHAB CALIBRATION
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0f2027, #000)",
    color: "#00f2fe",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center",
  },

  title: {
    fontSize: "26px",
    marginBottom: "8px",
  },

  subtitle: {
    fontSize: "14px",
    opacity: 0.8,
    marginBottom: "20px",
  },

  image: {
    width: "260px",
    marginBottom: "20px",
    borderRadius: "10px",
    filter: "drop-shadow(0 0 20px rgba(0,242,254,0.4))",
  },

  list: {
    textAlign: "left",
    maxWidth: "360px",
    marginBottom: "30px",
    lineHeight: "1.6",
    fontSize: "15px",
  },

  btn: {
    padding: "14px 34px",
    borderRadius: "30px",
    border: "none",
    background: "#00f2fe",
    color: "#000",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "1px",
  },
};

export default RehabArmGuide;
