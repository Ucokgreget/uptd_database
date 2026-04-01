const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/adminModel");

mongoose.connect("mongodb://127.0.0.1:27017/uptd");

async function createAdmin() {
  const email = "admin@gmail.com";
  const password = "123456";

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.deleteMany({ email }); // biar gak dobel

  const admin = new Admin({
    email,
    password: hashedPassword
  });

  await admin.save();
  console.log("✅ Admin berhasil dibuat");
  process.exit();
}

createAdmin();
