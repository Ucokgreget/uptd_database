import { prisma } from "../lib/prisma.js";
import { createCustomError } from "../error/custom-error.js";

const getAllPegawai = async (req, res) => {
  try {
    const pegawai = await prisma.pegawai.findMany();
    res.status(200).json(pegawai);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const createPegawai = async (req, res) => {
  try {
    const { nama, nip, noTelp } = req.body;

    const pegawai = await prisma.pegawai.create({
      data: {
        nama,
        nip,
        noTelp,
      },
    });

    res.status(200).json(pegawai);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const getPegawaiById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pegawai = await prisma.pegawai.findUnique({
      where: { id: Number(id) },
    });

    if (!pegawai) {
      return createCustomError(`no data with id:${id}`, 404);
    }
    res.status(200).json(pegawai);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deletePegawai = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPegawai = await prisma.pegawai.delete({
      where: { id: Number(id) },
    });
    if (!deletedPegawai) {
      return createCustomError(`no data with id:${id}`, 404);
    }
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updatePegawai = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nama, nip, noTelp } = req.body;

    const updatedPegawai = await prisma.pegawai.update({
      where: { id: Number(id) },
      data: {
        nama,
        nip,
        noTelp,
      },
    });

    if (!updatedPegawai) {
      return createCustomError(`no data with id:${id}`, 404);
    }
    res.status(200).json(updatedPegawai);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export {
  getAllPegawai,
  createPegawai,
  getPegawaiById,
  deletePegawai,
  updatePegawai,
};
