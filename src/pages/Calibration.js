import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Calibration() {
  const navigate = useNavigate();
  const ranOnce = useRef(false); // 👈 important

  const [status, setStatus] = useState({
    ecg: "Analyzing…",
    emg: "Analyzing…",
    spo2: "Analyzing…",
    flex: "Analyzing…",
  });

  useEffect(() => {
    if (ranOnce.current) return; // 👈 stops double run
    ranOnce.current = true;

    setTimeout(() => setStatus(s => ({ ...s, ecg: "✓ Calibrated" })), 1200);
    setTimeout(() => setStatus(s => ({ ...s, emg: "✓ Calibrated" })), 2200);
    setTimeout(() => setStatus(s => ({ ...s, spo2: "✓ Calibrated" })), 3200);
    setTimeout(() => setStatus(s => ({ ...s, flex: "✓ Calibrated" })), 4200);

    setTimeout(() => {
      navigate("/camera");
    }, 6500);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Calibrating Sensors</h2>

      <div style={styles.loader}></div>

      <div style={styles.list}>
        <p>ECG – {status.ecg}</p>
        <p>EMG – {status.emg}</p>
        <p>SpO₂ – {status.spo2}</p>
        <p>Flex Sensor – {status.flex}</p>
      </div>

      <p style={styles.note}>
        Please stay still while sensors are being analyzed.
        <br />
        Camera-based exercise monitoring will start next.
      </p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "radial-gradient(circle at top, #0f2027, #000)",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "25px",
  },
  heading: { fontSize: "26px" },
  loader: {
    width: "60px",
    height: "60px",
    border: "5px solid rgba(255,255,255,0.2)",
    borderTop: "5px solid #00f2fe",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  list: {
    marginTop: "20px",
    fontSize: "16px",
    lineHeight: "1.8",
    minWidth: "240px",
  },
  note: {
    marginTop: "30px",
    opacity: 0.8,
    fontSize: "14px",
    textAlign: "center",
  },
};

const style = document.createElement("style");
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

export default Calibration;
