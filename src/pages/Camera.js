import { useState, useEffect } from "react";

import StopOverlay from "./StopOverlay";

function Camera() {
  const [stopped, setStopped] = useState(false);
  const [reason, setReason] = useState("");

  // 🔴 Fake trigger for demo / hackathon
  useEffect(() => {
    const timer = setTimeout(() => {
      setReason("ECG abnormal");
      setStopped(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <h2>Camera-based exercise monitoring starts here</h2>

      {/* STOP ALERT OVERLAY */}
      {stopped && <StopOverlay reason={reason} />}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#000",
    color: "#00f2fe",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center",
  },
};

export default Camera;
