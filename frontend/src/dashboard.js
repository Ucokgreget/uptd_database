import Sidebar from "../src/components/Sidebar";
import Jadwal from "../src/components/Jadwal";
import JadwalForm from "../src/components/JadwalForm";
import "./dashboard.css";

function Dashboard({ pegawai, client, jadwal, setJadwal }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Selamat Datang Kembali Admin</h1>

        <div className="summary">
          <div className="card">
            <h3>Total Pegawai</h3>
            <p>{pegawai.length}</p>
          </div>

          <div className="card">
            <h3>Total Client</h3>
            <p>{client.length}</p>
          </div>
        </div>

        <JadwalForm setJadwal={setJadwal} />
        <Jadwal jadwal={jadwal} setJadwal={setJadwal} />
      </div>
    </div>
  );
}

export default Dashboard;
