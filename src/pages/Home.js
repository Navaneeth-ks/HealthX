import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.jpg";
import man from "../assets/man1.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#000", color: "#fff" }}>
      
      {/* HERO SECTION */}
      <section
        style={{
          height: "100vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          paddingLeft: "8%",
        }}
      >
        <div>
          <h1 style={styles.heroText}>
            BE YOUR <span style={{ color: "#00e676" }}>BEST</span>
          </h1>

          {/* ✅ Correct navigation */}
          <button
            style={styles.btn}
            onClick={() => navigate("/details")}
          >
            START
          </button>
        </div>
      </section>

      {/* SCROLL IMAGE SECTION */}
      <section
        style={{
          height: "100vh",
          backgroundImage: `url(${man})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={styles.quote}>WORK • PUSH • REPEAT</h2>
      </section>

    </div>
  );
}

const styles = {
  heroText: {
    fontSize: "80px",
    fontWeight: "800",
    letterSpacing: "3px",
    lineHeight: "1",
    marginBottom: "30px",
  },

  btn: {
    padding: "16px 60px",
    fontSize: "18px",
    letterSpacing: "2px",
    borderRadius: "40px",
    border: "none",
    background: "#00e676",
    color: "#000",
    cursor: "pointer",
    fontWeight: "600",
  },

  quote: {
    fontSize: "48px",
    letterSpacing: "4px",
    background: "rgba(0,0,0,0.6)",
    padding: "20px 40px",
    borderRadius: "10px",
  },
};

export default Home;
