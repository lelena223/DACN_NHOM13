const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/DACN_DB';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

module.exports = connectDB;
