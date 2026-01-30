import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import body from "../assets/body3d.png";

function SensorGuide() {
  const navigate = useNavigate();

  const mode = localStorage.getItem("mode");
  const workout = localStorage.getItem("workoutType");

  // 🚫 BLOCK SENSOR GUIDE FOR REHAB MODE
  useEffect(() => {
    if (mode === "REHAB") {
      navigate("/rehab-goal");
    }
  }, [mode, navigate]);

  const isArm =
    workout === "ARM_RAISE" || workout === "BICEP_CURL";
  const isLeg = workout === "SQUAT";

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>EMG Sensor Placement</h2>

      <div style={styles.main}>
        <div style={styles.imageWrap}>
          <div style={styles.imageBg}></div>
          <div style={styles.depthGlow}></div>

          <img src={body} alt="Human Body" style={styles.image} />

          {isArm && (
            <>
              <div style={{ ...styles.glow, top: "36%", left: "60%" }} />
              <div style={{ ...styles.glow, top: "36%", left: "40%" }} />
            </>
          )}

          {isLeg && (
            <>
              <div style={{ ...styles.glow, top: "68%", left: "54%" }} />
              <div style={{ ...styles.glow, top: "68%", left: "46%" }} />
            </>
          )}
        </div>

        <div style={styles.text}>
          <h3>
            Selected Workout:{" "}
            <span style={{ color: "#00f2fe" }}>{workout}</span>
          </h3>

          <ul>
            <li>Place EMG on the muscle belly</li>
            <li>Avoid joints and bones</li>
            <li>Clean skin before placement</li>
            <li>Ensure firm contact</li>
          </ul>

          <button
            style={styles.btn}
            onClick={() => navigate("/calibration")}
          >
            I HAVE PLACED THE SENSOR
          </button>
        </div>
      </div>
    </div>
  );
}



const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0f2027, #000)",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif",
    padding: "40px",
  },

  heading: {
    textAlign: "center",
    marginBottom: "40px",
  },

  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "90px",
    flexWrap: "wrap",
  },

  imageWrap: {
    position: "relative",
    width: "380px",
  },

  imageBg: {
    position: "absolute",
    inset: "-40px",
    background:
      "radial-gradient(circle at center, rgba(0,0,0,0.9), rgba(0,0,0,1))",
    borderRadius: "20px",
  },

  depthGlow: {
    position: "absolute",
    inset: "-30px",
    background:
      "radial-gradient(circle at center, rgba(0,242,254,0.25), transparent 70%)",
    filter: "blur(45px)",
  },

  image: {
    width: "100%",
    position: "relative",
  },

  glow: {
    position: "absolute",
    width: "24px",
    height: "24px",
    background: "#00f2fe",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0 25px 15px rgba(0,242,254,0.8)",
  },

  text: {
    maxWidth: "360px",
  },

  btn: {
    marginTop: "30px",
    padding: "14px 32px",
    borderRadius: "30px",
    border: "none",
    background: "#00f2fe",
    color: "#000",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default SensorGuide;
