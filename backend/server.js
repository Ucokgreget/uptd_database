import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import connectDB from "./config/connectDb";

import pegawaiRoute from "./routes/pegawaiRoute.js";
import clientRoute from "./routes/clientRoute.js";
import authRoutes from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/pegawai", pegawaiRoute);
app.use("/api/client", clientRoute);
app.use("/api/users", userRoute);

// test
app.get("/", (req, res) => {
  res.send("Backend jalan 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
