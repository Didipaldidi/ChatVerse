const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.get("/", (req,res) => {
    res.send("API is Successfully")
})

app.get("/api/chat", (req,res) => {
    res.send(chats)
})

const PORT = process.env.PORT;

app.listen(5000, console.log(`Server Started on PORT ${PORT}`));