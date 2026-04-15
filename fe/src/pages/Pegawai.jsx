import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Pegawai = () => {
  const [pegawai, setPegawai] = useState([]);

  const fetchPegawai = async () => {
    try {
      const res = await api.get("/pegawai");
      setPegawai(res.data);
    } catch (error) {
      console.log("Error fetching pegawai:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus pegawai ini?")) {
      try {
        await api.delete(`/pegawai/${id}`);
        toast.success("Pegawai berhasil dihapus");
        fetchPegawai();
      } catch (error) {
        console.error("Error deleting pegawai:", error);
        toast.error("Gagal menghapus pegawai");
      }
    }
  };

  useEffect(() => {
    fetchPegawai();
  }, []);

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Data Pegawai
          </h1>
          <p className="text-slate-500 mt-1">
            Kelola data seluruh pegawai yang terdaftar.
          </p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/add-pegawai" className="flex items-center gap-2">
            <span className="text-xl leading-none">+</span> Tambah Pegawai
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-slate-600">No</TableHead>
              <TableHead className="font-semibold text-slate-600">
                Nama
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                NIP
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                No. Telp
              </TableHead>
              <TableHead className="font-semibold text-slate-600 text-center">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pegawai.map((p, index) => (
              <TableRow
                key={p.id || p._id || index}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell className="font-medium text-slate-500">
                  {index + 1}
                </TableCell>
                <TableCell className="font-semibold text-slate-800">
                  {p.nama}
                </TableCell>
                <TableCell>{p.nip}</TableCell>
                <TableCell>{p.noTelp}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      to={`/edit-pegawai/${p.id || p._id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id || p._id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pegawai.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan="5"
                  className="h-32 text-center text-slate-500"
                >
                  Belum ada data pegawai yang tersimpan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Pegawai;
