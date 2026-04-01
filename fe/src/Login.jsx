import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat login";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F2CDAA] font-['Segoe_UI',sans-serif]">
      <div className="w-[520px] rounded-[22px] bg-[#FFF3E6] p-[45px] text-center shadow-[0_14px_40px_rgba(0,0,0,0.18)]">
        <img
          src="/logo.png"
          alt="UPTD Logo"
          className="mb-5 inline-block w-[150px]"
        />

        <h2 className="mb-[30px] text-[20px] leading-[1.4] text-[#3B2F2F]">
          SELAMAT DATANG DI UPTD <br />
          PANTI SOSIAL REHABILITASI SENSORIK
        </h2>

        <div className="mb-5 flex items-center rounded-[35px] bg-[#E3B996] px-[22px] py-4">
          <span className="mr-3 text-[18px]">👤</span>
          <input
            type="email"
            placeholder="Masuk email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-none bg-transparent text-[16px] outline-none placeholder:text-black/60"
          />
        </div>

        <div className="mb-5 flex items-center rounded-[35px] bg-[#E3B996] px-[22px] py-4">
          <span className="mr-3 text-[18px]">🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-none bg-transparent text-[16px] outline-none placeholder:text-black/60"
          />
        </div>

        <button
          onClick={handleLogin}
          className="mt-[15px] w-full cursor-pointer rounded-[35px] bg-[#9C6A43] p-4 text-[18px] text-white transition-colors hover:bg-[#7E5233]"
        >
          SIGN IN
        </button>

        <button
          className="mt-4 cursor-pointer border-none bg-transparent text-[15px] text-[#5B5BFF]"
          onClick={() => setPage("forgot")}
        >
          Lupa Password?
        </button>

        <p className="mt-7 text-[13px] text-[#555]">
          © 2026 UPTD Panti Sosial Rehabilitasi Sensorik
        </p>
      </div>
    </div>
  );
}

export default Login;
