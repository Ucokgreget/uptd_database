import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import { Button } from "@/components/ui/button";

function Client() {
  const [client, setClient] = useState([]);

  const fetchClient = async () => {
    try {
      const res = await api.get("/client");
      setClient(res.data);
    } catch (error) {
      console.log("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClient();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F2CDAA] font-['Segoe_UI',sans-serif]">
      <Sidebar />

      <div className="flex-1 p-[40px]">
        <div className="mb-[30px] flex items-center justify-between">
          <h1 className="text-[28px] font-bold text-[#3B2F2F]">Data Client</h1>
          <Button>
            <Link to="/add-client">
              <span className="text-xl leading-none">+</span> Tambah Client
            </Link>
          </Button>
        </div>

        <div className="overflow-x-auto rounded-xl bg-[#FFF3E6] p-6 shadow-sm">
          <table className="table w-full text-left text-[#3B2F2F]">
            <thead>
              <tr className="border-b-2 border-[#E5D3C1] text-[#8b6a55]">
                <th className="pb-3 text-lg">No</th>
                <th className="pb-3 text-lg">Nama</th>
                <th className="pb-3 text-lg">Email</th>
                <th className="pb-3 text-lg">No. Telp</th>
                <th className="pb-3 text-lg">Alamat</th>
              </tr>
            </thead>
            <tbody>
              {client.map((c, index) => (
                <tr
                  key={c._id || c.id}
                  className="border-b border-[#E5D3C1] hover:bg-[#FCECDA] transition-colors"
                >
                  <td className="py-4">{index + 1}</td>
                  <td className="py-4 font-semibold">{c.nama}</td>
                  <td className="py-4">{c.email}</td>
                  <td className="py-4">{c.noTelp}</td>
                  <td className="py-4">{c.alamat}</td>
                </tr>
              ))}
              {client.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-500">
                    Belum ada data client yang tersimpan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Client;
