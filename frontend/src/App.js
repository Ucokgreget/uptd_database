import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Pegawai from "./Pegawai";
import Client from "./Client";
import { useState } from "react";

function App() {
  const [pegawai, setPegawai] = useState([]);
  const [client, setClient] = useState([]);
  const [jadwal, setJadwal] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              pegawai={pegawai}
              client={client}
              jadwal={jadwal}
              setJadwal={setJadwal}
            />
          }
        />
        <Route
          path="/pegawai"
          element={<Pegawai pegawai={pegawai} setPegawai={setPegawai} />}
        />
        <Route
          path="/client"
          element={<Client client={client} setClient={setClient} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
