require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/connectDb");

const pegawaiRoute = require("./routes/pegawaiRoute");
const clientRoute = require("./routes/clientRoute");
const authRoutes = require("./routes/authRoute");

const app = express();


app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/pegawai", pegawaiRoute);
app.use("/api/client", clientRoute);

// test
app.get("/", (req, res) => {
  res.send("Backend jalan 🚀");
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try{
    await connectDB(process.env.DATABABASE_URL);
    app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT}`);
    });
  }catch(error){
    console.log(error)
  }
}

start()