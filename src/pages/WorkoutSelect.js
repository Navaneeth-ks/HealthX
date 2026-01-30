import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WorkoutSelect() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem("workoutType", selected);
    navigate("/guide"); // Sensor placement guide
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Select Workout</h2>

        {/* SQUAT */}
        <button
          style={selected === "SQUAT" ? styles.active : styles.btn}
          onClick={() => setSelected("SQUAT")}
        >
          🦵 Squat (Leg)
        </button>

        {/* ARM RAISE */}
        <button
          style={selected === "ARM_RAISE" ? styles.active : styles.btn}
          onClick={() => setSelected("ARM_RAISE")}
        >
          🙌 Arm Raise
        </button>

        {/* BICEP CURL */}
        <button
          style={selected === "BICEP_CURL" ? styles.active : styles.btn}
          onClick={() => setSelected("BICEP_CURL")}
        >
          💪 Bicep Curl
        </button>

        <p style={styles.info}>
          Sensor placement guidance will be provided
        </p>

        <button
          style={{
            ...styles.continue,
            opacity: selected ? 1 : 0.4,
          }}
          disabled={!selected}
          onClick={handleContinue}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}

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
    width: "400px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    boxShadow: "0 0 30px rgba(0,242,254,0.25)",
    textAlign: "center",
  },

  heading: {
    marginBottom: "30px",
    fontSize: "24px",
  },

  btn: {
    width: "100%",
    padding: "14px",
    marginBottom: "16px",
    borderRadius: "12px",
    border: "1px solid #00f2fe",
    background: "transparent",
    color: "#00f2fe",
    fontSize: "16px",
    cursor: "pointer",
  },

  active: {
    width: "100%",
    padding: "14px",
    marginBottom: "16px",
    borderRadius: "12px",
    border: "none",
    background: "#00f2fe",
    color: "#000",
    fontSize: "16px",
    fontWeight: "600",
  },

  info: {
    marginTop: "20px",
    fontSize: "14px",
    opacity: 0.8,
  },

  continue: {
    marginTop: "30px",
    width: "100%",
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    background: "#00f2fe",
    color: "#000",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default WorkoutSelect;
