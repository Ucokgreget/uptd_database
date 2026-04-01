const mongoose = require("mongoose");

const pegawaiSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  nip: { type: String, required: true, unique: true },
  jabatan: { type: String, required: true },
  unitKerja: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  noTelp: { type: String, required: true }
});

const Pegawai = mongoose.model("Pegawai", pegawaiSchema);

module.exports = Pegawai;