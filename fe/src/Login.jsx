import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("nama", res.data.nama);

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
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 font-['Inter',sans-serif]">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-10 shadow-sm border border-slate-200 text-center mx-4">
        <img
          src="/Logo.png"
          alt="UPTD Logo"
          className="mb-6 inline-block h-16 object-contain"
        />

        <h2 className="mb-8 text-lg font-bold text-slate-800 tracking-tight">
          SELAMAT DATANG DI UPTD <br className="hidden md:block" />
          PANTI SOSIAL REHABILITASI SENSORIK
        </h2>

        <form onSubmit={handleLogin} className="w-full text-left">
          <div className="mb-4 flex items-center rounded-xl bg-slate-100 px-4 py-3 border border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <span className="mr-3 text-slate-400">👤</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Masuk email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              required
            />
          </div>

          <div className="mb-6 flex items-center rounded-xl bg-slate-100 px-4 py-3 border border-slate-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <span className="mr-3 text-slate-400">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-3 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
          >
            SIGN IN
          </button>
        </form>

        <button
          className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          onClick={() => setPage("forgot")}
        >
          Lupa Password?
        </button>

        <p className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} UPTD Panti Sosial Rehabilitasi Sensorik
        </p>
      </div>
    </div>
  );
}

export default Login;
