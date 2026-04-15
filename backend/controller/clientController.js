import { prisma } from "../lib/prisma.js";
import { createCustomError } from "../error/custom-error.js";

const getClient = async (req, res) => {
  try {
    const client = await prisma.anakPanti.findMany();
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createClient = async (req, res) => {
  try {
    const {
      nama,
      alamat,
      nik,
      tanggalLahir,
      jenisKelamin,
      noTelp,
      email,
      disabilitas,
    } = req.body;

    const client = await prisma.anakPanti.create({
      data: {
        nama,
        alamat,
        nik,
        tanggalLahir,
        jenisKelamin,
        noTelp,
        email,
        disabilitas,
      },
    });

    res.status(200).json(client);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getClientById = async (req, res, next) => {
  const { id } = req.params;
  const client = await prisma.anakPanti.findUnique({
    where: { id: Number(id) },
  });

  if (!client) {
    return createCustomError(`no data with id:${id}`, 404);
  }
  res.status(200).json(client);
};

const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedClient = await prisma.anakPanti.delete({
      where: { id: Number(id) },
    });
    if (!deletedClient) {
      return createCustomError(`no data with id:${id}`, 404);
    }
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      nama,
      alamat,
      nik,
      tanggalLahir,
      jenisKelamin,
      noTelp,
      email,
      disabilitas,
    } = req.body;

    const updatedClient = await prisma.anakPanti.update({
      where: { id: Number(id) },
      data: {
        nama,
        alamat,
        nik,
        tanggalLahir,
        jenisKelamin,
        noTelp,
        email,
        disabilitas,
      },
    });

    if (!updatedClient) {
      return createCustomError(`no data with id:${id}`, 404);
    }
    res.status(200).json(updatedClient);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { getClient, createClient, getClientById, deleteClient, updateClient };
