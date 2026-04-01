import { useState } from "react";

function JadwalForm({ setJadwal }) {
  const [hari, setHari] = useState("");
  const [kegiatan, setKegiatan] = useState("");

  const tambahJadwal = () => {
    if (!hari || !kegiatan) return;

    setJadwal((prev) => [
      ...prev,
      { id: Date.now(), hari, kegiatan },
    ]);

    setHari("");
    setKegiatan("");
  };

  return (
    <div className="form-box">
      <h3>Tambah Jadwal</h3>
      <input
        placeholder="Hari (Senin, Selasa...)"
        value={hari}
        onChange={(e) => setHari(e.target.value)}
      />
      <input
        placeholder="Kegiatan"
        value={kegiatan}
        onChange={(e) => setKegiatan(e.target.value)}
      />
      <button onClick={tambahJadwal}>Tambah Jadwal</button>
    </div>
  );
}

export default JadwalForm;
