const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const connectDB = require("./config/database")
const router = require("./routers/index")

const app = express();
dotenv.config();

app.use(express.json());
app.use('/api/v1', router);

connectDB();

const port = process.env.PORT;
app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
})
