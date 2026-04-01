import "./Login.css";

function ResetPassword({ setPage }) {
  return (
    <div className="container">
      <div className="card">

        <h2>RESET PASSWORD</h2>

        <div className="input-group">
          <span>🔑</span>
          <input type="password" placeholder="Password baru" />
        </div>

        <div className="input-group">
          <span>🔑</span>
          <input type="password" placeholder="Konfirmasi password" />
        </div>

        <button onClick={() => {
          alert("Password berhasil direset");
          setPage("login");
        }}>
          SIMPAN PASSWORD
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;
