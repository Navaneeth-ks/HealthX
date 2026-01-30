import { useNavigate } from "react-router-dom";

function RehabCalibration() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Rehab Calibration</h2>

      <p style={styles.text}>
        This calibration ensures EMG & ECG signals stay within
        safe rehabilitation limits.
      </p>

      <ul style={styles.list}>
        <li>Remain still during baseline capture</li>
        <li>Perform slow, low-intensity movements</li>
        <li>Calibration auto-stops if unsafe signals appear</li>
      </ul>

      <button
        style={styles.btn}
        onClick={() => navigate("/rehab-summary")}
      >
        FINISH REHAB SESSION
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
    padding: "40px",
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center",
  },
  title: { fontSize: "28px", marginBottom: "12px" },
  text: {
    fontSize: "15px",
    maxWidth: "420px",
    marginBottom: "25px",
    lineHeight: "1.6",
  },
  list: {
    textAlign: "left",
    maxWidth: "420px",
    marginBottom: "35px",
    lineHeight: "1.6",
    fontSize: "15px",
  },
  btn: {
    padding: "14px 36px",
    borderRadius: "30px",
    border: "none",
    background: "#00f2fe",
    color: "#000",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default RehabCalibration;
