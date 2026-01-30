import { useNavigate } from "react-router-dom";

function RehabGoal() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Rehabilitation Goal</h2>

        <p style={styles.desc}>
          Select the rehabilitation focus area. Sensor thresholds and intensity
          will be adjusted automatically.
        </p>

        <button
          style={styles.btn}
          onClick={() => navigate("/rehab-leg-guide")}
        >
          🦵 Leg Rehab (ACL / Knee)
        </button>

        <button
          style={styles.btn}
          onClick={() => navigate("/rehab-arm-guide")}
        >
          💪 Arm / Shoulder Rehab
        </button>

        <p style={styles.back} onClick={() => navigate("/rehab")}>
          ← Back
        </p>
      </div>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  container: {
    height: "100vh",
    background: "radial-gradient(circle at top, #0f2027, #000)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    width: "480px",
    padding: "45px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.06)",
    boxShadow: "0 0 40px rgba(0,242,254,0.25)",
    textAlign: "center",
  },
  title: {
    color: "#00f2fe",
    marginBottom: "15px",
    fontSize: "26px",
  },
  desc: {
    fontSize: "15px",
    opacity: 0.85,
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  btn: {
    width: "100%",
    padding: "16px",
    marginBottom: "18px",
    borderRadius: "30px",
    border: "none",
    background: "#00f2fe",
    color: "#000",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  back: {
    marginTop: "10px",
    cursor: "pointer",
    color: "#00f2fe",
    opacity: 0.85,
  },
};

export default RehabGoal;
