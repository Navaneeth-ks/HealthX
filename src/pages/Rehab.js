import { useNavigate } from "react-router-dom";

function Rehab() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Rehabilitation Mode</h2>

        <p style={styles.text}>
          Rehab mode is designed for low-intensity, safe recovery exercises.
          Sensor thresholds are strictly controlled.
        </p>

        <button
          style={styles.primaryBtn}
          onClick={() => navigate("/rehab-goal")}
        >
          SELECT REHAB GOAL
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => navigate("/workout")}
        >
          GO TO EXERCISE MODE
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    height: "100vh",
    background: "radial-gradient(circle at top, #0f2027, #000)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff",
  },

  card: {
    width: "460px",
    padding: "50px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.06)",
    boxShadow: "0 0 40px rgba(0,242,254,0.25)",
    textAlign: "center",
  },

  title: {
    color: "#00f2fe",
    marginBottom: "20px",
    fontSize: "26px",
  },

  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "30px",
    opacity: 0.9,
  },

  primaryBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    background: "#00f2fe",
    color: "#000",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "15px",
  },

  secondaryBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "30px",
    border: "1px solid #00f2fe",
    background: "transparent",
    color: "#00f2fe",
    cursor: "pointer",
  },
};

export default Rehab;
