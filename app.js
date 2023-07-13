require("dotenv").config();
const express = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const cors = require("cors");

const app = express();

const http = require("http");
const httpServer = http.createServer(app);

const { Server } = require("socket.io");
app.use(cors());

const io = new Server(httpServer, {
    cors: process.env.CLIENT_BASE_URL,
});

const port = process.env.port;
const host = process.env.host;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: ReasonPhrases.OK,
    });
});

io.on("connection", (socket) => {
    console.log(`Initial client ${socket.id} is connected`);

    socket.on("message_from_client", (msg) => {
        console.log(msg);

        socket.emit("message_from_server", (msg) => {
            console.log(`Server sends message  ${socket.id} is connected`);
            console.log(`message from server ${msg}`);
        });
    });

    socket.on("disconnected", (msg) => {
        console.log(`User ${socket.id} is disconnected`);
    });
});

httpServer.listen(port, host, () => {
    console.log(`Server is listening on http://${host}:${port}`);
});
