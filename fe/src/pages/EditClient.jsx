import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";

function EditClient() {
  const { id } = useParams();
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nik, setNik] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");
  const [disabilitas, setDisabilitas] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await api.get(`/client/${id}`);
        const data = res.data;
        setNama(data.nama || "");
        setAlamat(data.alamat || "");
        setNik(data.nik || "");
        // Format the date to YYYY-MM-DD for the input type="date"
        if (data.tanggalLahir) {
          const date = new Date(data.tanggalLahir);
          setTanggalLahir(date.toISOString().split("T")[0]);
        }
        setJenisKelamin(data.jenisKelamin || "");
        setNoTelp(data.noTelp || "");
        setEmail(data.email || "");
        setDisabilitas(data.disabilitas || "");
      } catch (error) {
        console.error("Error fetching client:", error);
        toast.error("Gagal memuat data client");
      }
    };
    fetchClient();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nama.trim() ||
      !alamat.trim() ||
      !nik.trim() ||
      !tanggalLahir.trim() ||
      !jenisKelamin.trim() ||
      !noTelp.trim() ||
      !email.trim()
    ) {
      toast.error("Harus isi semua form (Kecuali disabilitas jika tidak ada)");
      return;
    }

    setLoading(true);
    try {
      await api.put(`/client/${id}`, {
        nama,
        alamat,
        nik,
        tanggalLahir: new Date(tanggalLahir).toISOString(),
        jenisKelamin,
        noTelp,
        email,
        disabilitas,
      });

      toast.success("Anak Panti telah berhasil diupdate", {
        duration: 4000,
        icon: "✅",
      });
      navigate("/client");
    } catch (error) {
      console.error("Error dari method PUT:", error);
      toast.error("Gagal mengupdate client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="mb-8 text-3xl font-bold text-slate-900 tracking-tight">
        Edit Data Client
      </h1>

      <div className="mb-6 max-w-2xl bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-semibold text-[#8b6a55]">
                Nama
              </span>
            </label>
            <input
              type="text"
              placeholder="Masukkan Nama"
              className="input input-bordered w-full rounded-lg border-[#D7B59A] px-4 py-2 outline-none focus:border-[#9C6A43]"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-semibold text-[#8b6a55]">
                Alamat
              </span>
            </label>
            <input
              type="text"
              placeholder="Masukkan Alamat"
              className="input input-bordered w-full bg-white rounded-lg border-[#D7B59A] px-4 py-2 outline-none focus:border-[#9C6A43]"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-semibold text-[#8b6a55]">
                NIK
              </span>
            </label>
            <input
              type="text"
              placeholder="Masukkan NIK"
              className="input input-bordered w-full bg-white rounded-lg border-[#D7B59A] px-4 py-2 outline-none focus:border-[#9C6A43]"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-semibold text-[#8b6a55]">
                Tanggal Lahir
              </span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full bg-white rounded-lg border-[#D7B59A] px-4 py-2 outline-none focus:border-[#9C6A43]"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-semibold text-[#8b6a55]">
                Jenis Kelamin
              </span>
            </label>
            <select
              className="input input-bordered w-full bg-white rounded-lg border-[#D7B59A] px-4 py-2 outline-none focus:border-[#9C6A43]"
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e.target.value)}
            >
              <option value="" disabled>
                Pilih Jenis Kelamin
              </option>
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-semibold text-[#8b6a55]">
                No. Telp
              </span>
            </label>
            <input
              type="text"
              placeholder="Masukkan Nomor Telepon"
              className="input input-bordered w-full bg-white rounded-lg border-[#D7B59A] px-4 py-2 outline-none focus:border-[#9C6A43]"
              value={noTelp}
              onChange={(e) => setNoTelp(e.target.value)}
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-semibold text-[#8b6a55]">
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="Masukkan Email"
              className="input input-bordered w-full bg-white rounded-lg border-[#D7B59A] px-4 py-2 outline-none focus:border-[#9C6A43]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-semibold text-[#8b6a55]">
                Disabilitas (Opsional)
              </span>
            </label>
            <input
              type="text"
              placeholder="Masukkan Disabilitas (Jika Ada)"
              className="input input-bordered w-full bg-white rounded-lg border-[#D7B59A] px-4 py-2 outline-none focus:border-[#9C6A43]"
              value={disabilitas}
              onChange={(e) => setDisabilitas(e.target.value)}
            />
          </div>

          <div className="pt-6 flex gap-4">
            <button
              type="button"
              className="btn btn-outline flex-1 rounded-lg border-2 border-slate-300 py-2 text-slate-700 font-semibold transition-colors hover:bg-slate-100"
              onClick={() => navigate("/client")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 rounded-lg bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Loading..." : "Update Client"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default EditClient;
