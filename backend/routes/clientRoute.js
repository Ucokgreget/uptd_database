const express = require("express");
const router = express.Router();
const {getClient, createClient, getClientById, deleteClient, updateClient} = require("../controller/clientController")

router.route("/").get(getClient).post(createClient)
router.route("/:id").get(getClientById).delete(deleteClient).put(updateClient)

module.exports = router