import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";

const EditPegawai = () => {
  const { id } = useParams();
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPegawai = async () => {
      try {
        const res = await api.get(`/pegawai/${id}`);
        const data = res.data;
        setNama(data.nama || "");
        setNip(data.nip || "");
        setNoTelp(data.noTelp || "");
      } catch (error) {
        console.error("Error fetching pegawai:", error);
        toast.error("Gagal memuat data pegawai");
      }
    };
    fetchPegawai();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama.trim() || !nip.trim() || !noTelp.trim()) {
      toast.error("Harus isi semua form");
      return;
    }

    setLoading(true);
    try {
      await api.put(`/pegawai/${id}`, {
        nama,
        nip,
        noTelp,
      });

      toast.success("Pegawai telah berhasil diupdate", {
        duration: 4000,
        icon: "✅",
      });
      navigate("/pegawai");
    } catch (error) {
      console.error("Error dari method PUT:", error);
      toast.error("Gagal mengupdate pegawai");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="mb-8 text-3xl font-bold text-slate-900 tracking-tight">
        Edit Data Pegawai
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
                NIP
              </span>
            </label>
            <input
              type="text"
              placeholder="Masukkan NIP"
              className="input input-bordered w-full bg-white rounded-lg border-[#D7B59A] px-4 py-2 outline-none focus:border-[#9C6A43]"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
            />
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

          <div className="pt-6 flex gap-4">
            <button
              type="button"
              className="btn btn-outline flex-1 rounded-lg border-2 border-slate-300 py-2 text-slate-700 font-semibold transition-colors hover:bg-slate-100"
              onClick={() => navigate("/pegawai")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 rounded-lg bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Loading..." : "Update Pegawai"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditPegawai;
