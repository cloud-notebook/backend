import express, { Application } from "express";
import dotenv from 'dotenv';
import errorMiddleware from "./middleware/error.middleware";
import authController from "./controllers/auth.controller";
import noteController from "./controllers/note.controller";
import messageController from "./controllers/message.controller";
import Connect from "./config/database.config";
import logger from "./config/logger";
import morganMiddleware from "./middleware/morgan.middleware";
import socket from "socket.io";


const app: Application = express();

//Environment variable
dotenv.config();

//JSON Parser
app.use(express.json());

//Database Configuration
Connect().catch((e: any) => {
    console.log(e);
});

//morgan middleware
app.use(morganMiddleware);

//Endpoints
app.use("/api/v1/auth", authController);
app.use("/api/v1/note", noteController);
app.use("/api/v1/message", messageController);

//Error Middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    logger.info(`Server Running on port ${process.env.PORT}`);
});

const io = new socket.Server(server);

io.on("connection", (socket) => {

    socket.on('room', (id) => {
        socket.rooms.add(id);
        console.log(`User Connected: ${socket.id}`);
    })


    socket.on("sendMessage", (data) => {
        // Now send the message to same room the connected users
        io.to(data.room).emit("receiveMessage", data);
    });

});