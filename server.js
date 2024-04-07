const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const connectDB = require("./config/database")

const app = express();
dotenv.config();

connectDB();

const port = process.env.PORT;
app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
})
