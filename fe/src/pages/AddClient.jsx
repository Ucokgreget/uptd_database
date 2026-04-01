import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";

function AddClient() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama.trim() || !email.trim() || !noTelp.trim() || !alamat.trim()) {
      toast.error("Harus isi semua");
      return;
    }

    setLoading(true);
    try {
      await api.post("/client", {
        nama,
        email,
        noTelp,
        alamat,
      });

      toast.success("Client telah berhasil dibuat", {
        duration: 4000,
        icon: "✅",
      });
      navigate("/client");
    } catch (error) {
      console.error("Error dari method POST:", error);
      console.error(
        "Detail Response Error:",
        error.response?.data || error.message,
      );

      if (error.response?.status === 429) {
        toast.error("Terlalu banyak aksi", {
          duration: 4000,
          icon: "😡",
        });
      } else {
        toast.error("Gagal membuat client");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F2CDAA] font-['Segoe_UI',sans-serif]">
      <Sidebar />

      <div className="flex-1 p-[40px]">
        <h1 className="mb-[30px] text-[28px] font-bold text-[#3B2F2F]">
          Tambah Data Client
        </h1>

        <div className="mb-6 max-w-2xl bg-[#FFF3E6] rounded-xl shadow-sm p-6">
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

            <div className="pt-6 flex gap-4">
              <button
                type="button"
                className="btn btn-outline flex-1 rounded-lg border-2 border-[#9C6A43] py-2 text-[#9C6A43] font-semibold transition-colors hover:bg-[#9C6A43] hover:text-white"
                onClick={() => navigate("/client")}
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1 rounded-lg bg-[#9C6A43] py-2 font-semibold text-white transition-colors hover:bg-[#7E5233]"
                disabled={loading}
              >
                {loading ? "Loading..." : "Tambah Client"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddClient;
