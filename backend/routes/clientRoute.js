import express from "express";
const router = express.Router();
import {
  getClient,
  createClient,
  getClientById,
  deleteClient,
  updateClient,
} from "../controller/clientController.js";
    
router.route("/").get(getClient).post(createClient);
router.route("/:id").get(getClientById).delete(deleteClient).put(updateClient);

export default router;
