function Jadwal({ jadwal, setJadwal }) {
  const hapusJadwal = (id) => {
    setJadwal(jadwal.filter((item) => item.id !== id));
  };

  return (
    <div className="schedule">
      <h2>Jadwal</h2>

      {jadwal.length === 0 && <p>Belum ada jadwal</p>}

      {jadwal.map((item) => (
        <div key={item.id} className="jadwal-item">
          <strong>{item.hari}</strong> - {item.kegiatan}
          <button onClick={() => hapusJadwal(item.id)}>Hapus</button>
        </div>
      ))}
    </div>
  );
}

export default Jadwal;
