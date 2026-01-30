import { useNavigate } from "react-router-dom";

function StopOverlay({ reason }) {
  const navigate = useNavigate();

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h1 style={styles.title}>WORKOUT STOPPED</h1>

        <p style={styles.reason}>
          Reason: <span style={styles.highlight}>{reason}</span>
        </p>

        <button
          style={styles.btn}
          onClick={() => navigate("/summary")}
        >
          VIEW SUMMARY
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  card: {
    background: "rgba(15,32,39,0.95)",
    padding: "50px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 0 50px rgba(255,0,0,0.4)",
    minWidth: "360px",
  },

  title: {
    color: "#ff5252",
    fontSize: "34px",
    letterSpacing: "2px",
    marginBottom: "25px",
  },

  reason: {
    fontSize: "18px",
    marginBottom: "40px",
  },

  highlight: {
    color: "#00f2fe",
    fontWeight: "600",
  },

  btn: {
    padding: "14px 40px",
    borderRadius: "30px",
    border: "none",
    background: "#00f2fe",
    color: "#000",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "1px",
  },
};

export default StopOverlay;
