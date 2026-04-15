import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nama: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      select: {
        id: true,
        nama: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ msg: "Semua field harus diisi" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ msg: "Email sudah terdaftar" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        nama,
        email,
        password: hashedPassword,
        role: role || "USER",
      },
    });
    res.status(201).json({ msg: "User berhasil dibuat", user });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    const dataToUpdate = { nama, email, role };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      dataToUpdate.password = await bcrypt.hash(password, salt);
    }

    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: dataToUpdate,
    });
    res.json({ msg: "User berhasil diupdate", user });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.json({ msg: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
