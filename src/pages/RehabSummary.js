import { useNavigate } from "react-router-dom";

function RehabSummary() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0f2027, #000)",
        color: "#00f2fe",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>
        Rehab Session Completed
      </h2>

      <p style={{ maxWidth: "420px", marginBottom: "30px" }}>
        Your rehabilitation session has been completed safely.
        All EMG & ECG values remained within recovery limits.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "14px 36px",
          borderRadius: "30px",
          border: "none",
          background: "#00f2fe",
          color: "#000",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        BACK TO HOME
      </button>
    </div>
  );
}

export default RehabSummary;
