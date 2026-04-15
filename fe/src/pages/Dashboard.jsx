import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../lib/axios";
import { Bar, BarChart, CartesianGrid, XAxis, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function Dashboard() {
  const [pegawai, setPegawai] = useState([]);
  const [client, setClient] = useState([]);
  const [namaUser, setNamaUser] = useState("");

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
    const storedNama = localStorage.getItem("nama");
    if (storedNama) setNamaUser(storedNama);
  }, []);

  const currentYear = new Date().getFullYear();
  const startYear = 2026;
  const chartData = [];

  for (let year = startYear; year <= currentYear; year++) {
    if (year === currentYear) {
      // Data tahun sekarang mengambil dari database riil
      chartData.push({
        year: year.toString(),
        pegawai: pegawai.length,
        client: client.length,
      });
    } else {
      // Mockup untuk histori tahun-tahun sebelumnya
      chartData.push({
        year: year.toString(),
        pegawai: Math.max(1, pegawai.length - (currentYear - year) * 2),
        client: Math.max(2, client.length - (currentYear - year) * 3),
      });
    }
  }

  const chartConfig = {
    pegawai: {
      label: "Pegawai",
      color: "#2563eb",
    },
    client: {
      label: "Anak Panti",
      color: "#16a34a",
    },
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
        Dashboard Utama
      </h1>
      <p className="mb-8 mt-2 text-lg text-slate-600 font-medium">
        Halo, {namaUser || "User"}! 👋
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="border-slate-200 shadow-sm border-none bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-500 font-medium">
              Total Pegawai Saat Ini
            </CardDescription>
            <CardTitle className="text-4xl font-bold text-blue-600">
              {pegawai.length || 0}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-slate-200 shadow-sm border-none bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-500 font-medium">
              Total Client Saat Ini
            </CardDescription>
            <CardTitle className="text-4xl font-bold text-green-600">
              {client.length || 0}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm bg-white border-none">
        <CardHeader>
          <CardTitle>Data Tahun Berjalan</CardTitle>
          <CardDescription>
            Statistik perbandingan jumlah pegawai dan anak panti pada tahun
            berjalan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="min-h-[300px] w-full max-h-[400px]"
          >
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="year"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                stroke="#64748b"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend iconType="circle" />
              <Bar
                dataKey="pegawai"
                fill="var(--color-pegawai)"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
              <Bar
                dataKey="client"
                name="Anak Panti"
                fill="var(--color-client)"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </Layout>
  );
}

export default Dashboard;
