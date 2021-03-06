require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async() => {
  const dbUrl = process.env.DB;
  try {
    await mongoose.connect(dbUrl)
    console.log('DB conectada exitosamente');
  } catch(error) {
    console.log(error);
  }
}
connectDB();