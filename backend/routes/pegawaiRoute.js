import express from "express";
const router = express.Router();
import {
  getAllPegawai,
  createPegawai,
  getPegawaiById,
  deletePegawai,
  updatePegawai,
} from "../controller/pegawaiController.js";

router.route("/").get(getAllPegawai).post(createPegawai);
router
  .route("/:id")
  .get(getPegawaiById)
  .delete(deletePegawai)
  .put(updatePegawai);

export default router;
