const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.get("/", (req,res) => {
    res.send("API is Successfully")
})

app.use("/api/user", userRoutes);

const PORT = process.env.PORT;

app.listen(5000, console.log(`Server Started on PORT ${PORT}`));