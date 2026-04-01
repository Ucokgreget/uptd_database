const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    nama: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    noTelp: { type: String, required: true },
    alamat: { type: String, required: true }
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client