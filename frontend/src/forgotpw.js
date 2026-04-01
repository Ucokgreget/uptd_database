import "./Login.css";

function ForgotPassword({ setPage }) {
  return (
    <div className="container">
      <div className="card">

        <h2>LUPA PASSWORD</h2>

        <p style={{ color: "#555", marginBottom: "20px" }}>
          Masukkan email untuk reset password
        </p>

        <div className="input-group">
          <span>📧</span>
          <input type="email" placeholder="Email terdaftar" />
        </div>

        <button onClick={() => setPage("reset")}>
          LANJUT
        </button>

        <button className="forgot-btn" onClick={() => setPage("login")}>
          Kembali ke Login
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;
