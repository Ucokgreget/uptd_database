import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import api from "../lib/axios";

const Pegawai = () => {
  const [pegawai, setPegawai] = useState([]);

  const fetchPegawai = async () => {
    try {
      const res = await api.get("/pegawai");
      setPegawai(res.data);
    } catch (error) {
      console.log("error fetching pegawai ", error);
    }
  };

  useEffect(() => {
    fetchPegawai();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F2CDAA] font-['Segoe_UI', sans-serif]">
      <Sidebar />

      <div className="flex-1 p-[40px]">
        <div></div>
      </div>
    </div>
  );
};

export default Pegawai;
