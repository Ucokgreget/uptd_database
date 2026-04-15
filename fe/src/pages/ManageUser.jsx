import { useState, useEffect } from "react";
import Layout from "../components/Layout";
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
import { Link } from "react-router-dom";

const ManageUser = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus user ini?")) {
      try {
        await api.delete(`/users/${id}`);
        toast.success("User berhasil dihapus");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Gagal menghapus user");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Manage User
          </h1>
          <p className="text-slate-500 mt-1">Kelola data akses admin & user.</p>
        </div>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 shadow-sm border-none text-white"
        >
          <Link to="/add-user" className="flex items-center gap-2">
            <span className="text-xl leading-none">+</span> Tambah User
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
                Email
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                Role
              </TableHead>
              <TableHead className="font-semibold text-slate-600 text-center">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u, index) => (
              <TableRow
                key={u.id || index}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell className="font-medium text-slate-500">
                  {index + 1}
                </TableCell>
                <TableCell className="font-semibold text-slate-800">
                  {u.nama}
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      u.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      to={`/edit-user/${u.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan="5"
                  className="h-32 text-center text-slate-500"
                >
                  Belum ada data user yang tersimpan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default ManageUser;
