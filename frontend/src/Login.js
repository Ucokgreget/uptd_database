import "./Login.css";
import { useState } from "react";
import axios from "axios";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", res.data.token);

    setPage("dashboard");
  } catch (err) {
    alert(
      err.response?.data?.msg || "Login gagal, cek email atau password"
    );
  }
};


  return (
    <div className="container">
      <div className="card">
        <img src="/logo.png" alt="UPTD Logo" className="logo" />

        <h2>
          SELAMAT DATANG DI UPTD <br />
          PANTI SOSIAL REHABILITASI SENSORIK
        </h2>

        <div className="input-group">
          <span>👤</span>
          <input
            type="email"
            placeholder="Masuk email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <span>🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>SIGN IN</button>

        <button className="forgot-btn" onClick={() => setPage("forgot")}>
          Lupa Password?
        </button>

        <p className="footer">
          © 2026 UPTD Panti Sosial Rehabilitasi Sensorik
        </p>
      </div>
    </div>
  );
}

export default Login;
