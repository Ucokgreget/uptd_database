import { Link } from "react-router-dom";
import "../dashboard.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src="/logo.png" alt="UPTD" className="logo" />

      <Link to="/dashboard" className="menu">HOME</Link>
      <Link to="/pegawai" className="menu">PEGAWAI</Link>
      <Link to="/client" className="menu">KLIEN</Link>
    </div>
  );
}

export default Sidebar;
