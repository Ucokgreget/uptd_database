import { useState } from "react";
import Sidebar from "../src/components/Sidebar";
import "./dashboard.css";

function Pegawai({ pegawai, setPegawai }) {
  const [nama, setNama] = useState("");

  const tambah = () => {
    if (!nama) return;
    setPegawai([...pegawai, { id: Date.now(), nama }]);
    setNama("");
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Data Pegawai</h1>

        <input
          placeholder="Nama Pegawai"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <button onClick={tambah}>Tambah</button>

        <ul>
          {pegawai.map((p) => (
            <li key={p.id}>{p.nama}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Pegawai;
