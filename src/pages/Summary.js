import { useNavigate } from "react-router-dom";

function Summary() {
  const navigate = useNavigate();

  const reason =
    localStorage.getItem("stopReason") || "ECG abnormal";

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Workout Summary</h1>

      {/* STOP REASON */}
      <div style={styles.reasonBox}>
        <span style={styles.stop}>WORKOUT STOPPED</span>
        <p>
          Reason: <strong style={{ color: "#ff5252" }}>{reason}</strong>
        </p>
      </div>

      {/* GRAPHS */}
      <div style={styles.grid}>
        <Graph title="ECG Signal" color="#ff5252" />
        <Graph title="EMG Signal" color="#00f2fe" />
        <Graph title="SpO₂ Level" color="#00e676" />
        <Graph title="Flex Sensor" color="#ffa726" />
      </div>

      {/* SESSION INFO */}
      <div style={styles.info}>
        <p>Session Duration: 02:15 min</p>
        <p>Workout Type: {localStorage.getItem("workoutType")}</p>
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          style={styles.btn}
          onClick={() => navigate("/workout")}
        >
          START NEW WORKOUT
        </button>

        <button
          style={styles.rehabBtn}
          onClick={() => navigate("/rehab")}
        >
          GO TO REHAB MODE
        </button>
      </div>
    </div>
  );
}

/* ===================== COMPONENT ===================== */

function Graph({ title, color }) {
  return (
    <div style={styles.graphCard}>
      <p style={{ marginBottom: "10px" }}>{title}</p>
      <div
        style={{
          ...styles.graph,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      ></div>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0f2027, #000)",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif",
    padding: "40px",
    textAlign: "center",
  },

  heading: {
    fontSize: "34px",
    marginBottom: "25px",
    color: "#00f2fe",
  },

  reasonBox: {
    marginBottom: "30px",
  },

  stop: {
    display: "block",
    color: "#ff5252",
    fontSize: "22px",
    letterSpacing: "2px",
    marginBottom: "8px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  graphCard: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 0 20px rgba(0,242,254,0.15)",
  },

  graph: {
    height: "80px",
    borderRadius: "10px",
    animation: "wave 2s infinite linear",
    opacity: 0.9,
  },

  info: {
    fontSize: "15px",
    opacity: 0.85,
    marginBottom: "35px",
  },

  btn: {
    padding: "14px 30px",
    borderRadius: "30px",
    border: "none",
    background: "#00f2fe",
    color: "#000",
    fontWeight: "600",
    cursor: "pointer",
  },

  rehabBtn: {
    padding: "14px 30px",
    borderRadius: "30px",
    border: "1px solid #00f2fe",
    background: "transparent",
    color: "#00f2fe",
    fontWeight: "600",
    cursor: "pointer",
  },
};

/* ===================== ANIMATION ===================== */

const style = document.createElement("style");
style.innerHTML = `
@keyframes wave {
  0% { background-position: 0% }
  100% { background-position: 200% }
}
`;
document.head.appendChild(style);

export default Summary;
