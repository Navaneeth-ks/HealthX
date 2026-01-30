import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserDetails() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sex: "",
    height: "",
    weight: "",
    age: "",
    activity: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveAndGo = (path) => {
    localStorage.setItem("userDetails", JSON.stringify(form));
    alert("✅ Profile created successfully!");
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Enter Your Details</h2>

        <input
          name="name"
          placeholder="Name"
          style={styles.input}
          onChange={handleChange}
        />

        <select name="sex" style={styles.input} onChange={handleChange}>
          <option value="">Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="height"
          type="number"
          placeholder="Height (cm)"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="weight"
          type="number"
          placeholder="Weight (kg)"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          style={styles.input}
          onChange={handleChange}
        />

        {/* NEW ACTIVITY LEVEL */}
        <select
          name="activity"
          style={styles.input}
          onChange={handleChange}
        >
          <option value="">How active are you?</option>
          <option value="Sedentary">Sedentary</option>
          <option value="Moderately Active">Moderately Active</option>
          <option value="Highly Active">Highly Active</option>
          <option value="Rehabilitation">Rehabilitation</option>
        </select>

        {/* ACTION BUTTONS */}
        <button
          style={styles.exerciseBtn}
          onClick={() => saveAndGo("/workout")}
        >
          EXERCISE MODE
        </button>

        <button
          style={styles.rehabBtn}
          onClick={() => saveAndGo("/rehab")}
        >
          REHAB MODE
        </button>
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
    width: "380px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    boxShadow: "0 0 30px rgba(0,242,254,0.25)",
    textAlign: "center",
  },

  heading: {
    marginBottom: "25px",
    fontSize: "24px",
    letterSpacing: "1px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },

  exerciseBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    background: "#00f2fe",
    color: "#000",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "1px",
    marginTop: "10px",
  },

  rehabBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "30px",
    border: "1px solid #00f2fe",
    background: "transparent",
    color: "#00f2fe",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "1px",
    marginTop: "12px",
  },
};

export default UserDetails;
