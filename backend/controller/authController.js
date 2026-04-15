// const User = require("../models/userModel");
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: "Email tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password salah" });
    }

    const token = jwt.sign({ id: user.id }, "SECRETKEY", { expiresIn: "1d" });

    res.json({ token, nama: user.nama });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: "Email sudah terdaftar" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await prisma.user.create({
      data: {
        nama,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ msg: "User berhasil didaftarkan" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export { login, register };
