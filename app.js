require("dotenv").config();
const express = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const cors = require("cors");

const app = express();

const http = require("http");
const httpServer = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(httpServer);

const port = process.env.port;
const host = process.env.host;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: ReasonPhrases.OK,
    });
});

const user = 0;
io.on("connection", (socket) => {
    console.log(`User ${user++} is connected`);

    socket.on("chat_message", (msg) => {
        console.log(msg);
    });
});

httpServer.listen(port, host, () => {
    console.log(`Server is listening on http://${host}:${port}`);
});
