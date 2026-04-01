const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        
            const user = await User.findOne({ email });
            if (!user) {
              return res.status(400).json({ msg: "Email tidak ditemukan" });
            }
        
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
              return res.status(400).json({ msg: "Password salah" });
            }
        
            const token = jwt.sign(
              { id: user._id },
              "SECRETKEY",
              { expiresIn: "1d" }
            );
        
            res.json({ token });
    }
    catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
}

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "Email sudah terdaftar" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ msg: "User berhasil didaftarkan" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
}

module.exports = { login, register };