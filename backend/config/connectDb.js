require('dotenv').config();
const mongoose = require('mongoose');

url = process.env.DATABABASE_URL 
const connectDB = (url)=>{
    mongoose.connect(url)
}


module.exports = connectDB;