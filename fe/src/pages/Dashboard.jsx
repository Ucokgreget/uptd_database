import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../lib/axios";

function Dashboard() {
  const [pegawai, setPegawai] = useState([]);
  const [client, setClient] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [pegawaiRes, clientRes] = await Promise.all([
          api.get("/pegawai").catch(() => ({ data: [] })),
          api.get("/client").catch(() => ({ data: [] })),
        ]);

        setPegawai(pegawaiRes.data || []);
        setClient(clientRes.data || []);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F2CDAA] font-['Segoe_UI',sans-serif]">
      <Sidebar />

      <div className="flex-1 p-[40px]">
        <h1 className="mb-[30px] text-[28px] font-bold text-[#3B2F2F]">
          Selamat Datang Kembali Admin
        </h1>

        <div className="mb-[30px] flex gap-[20px]">
          <div className="flex-1 rounded-[22px] bg-[#FFF3E6] p-[25px] text-center shadow-[0_14px_40px_rgba(0,0,0,0.18)]">
            <h3 className="mb-[10px] text-[20px] font-semibold text-[#8b6a55]">
              Total Pegawai
            </h3>
            <p className="text-[40px] font-bold text-[#6b4b3e]">
              {pegawai.length || 0}
            </p>
          </div>

          <div className="flex-1 rounded-[22px] bg-[#FFF3E6] p-[25px] text-center shadow-[0_14px_40px_rgba(0,0,0,0.18)]">
            <h3 className="mb-[10px] text-[20px] font-semibold text-[#8b6a55]">
              Total Client
            </h3>
            <p className="text-[40px] font-bold text-[#6b4b3e]">
              {client.length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
