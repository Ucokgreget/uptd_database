import { useState } from "react";
import Sidebar from "../src/components/Sidebar";
import "./dashboard.css";

function Client({ client, setClient }) {
  const [nama, setNama] = useState("");

  const tambah = () => {
    if (!nama) return;
    setClient([...client, { id: Date.now(), nama }]);
    setNama("");
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Data Client</h1>

        <input
          placeholder="Nama Client"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <button onClick={tambah}>Tambah</button>

        <ul>
          {client.map((c) => (
            <li key={c.id}>{c.nama}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Client;
