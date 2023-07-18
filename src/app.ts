import express, { Application } from "express";
import dotenv from 'dotenv';
import errorMiddleware from "./middleware/error.middleware";
import authController from "./controllers/auth.controller";
import noteController from "./controllers/note.controller";
import messageController from "./controllers/message.controller";
import chatController from "./controllers/chat.controller";
import userController from './controllers/user.controller';
import ratingController from './controllers/rating.controller';
import dashboardController from './controllers/dashboard.controller';
import Connect from "./config/database.config";
import logger from "./config/logger";
import morganMiddleware from "./middleware/morgan.middleware";
import socket from "socket.io";
import ErrorHandler from "./config/customErrorHandler";
import cors from 'cors';


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

//CORS
app.use(cors());

//Endpoints
app.use("/api/v1/auth", authController);
app.use("/api/v1/note", noteController);
app.use("/api/v1/chat", chatController);
app.use("/api/v1/message", messageController);
app.use("/api/v1/user", userController);
app.use("/api/v1/rating", ratingController);
app.use("/api/v1/dashboard", dashboardController);



// Not Found Middleware
app.use((req, res, next) => {
    next(new ErrorHandler("Api Not Found", 404));
})

//Error Middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    logger.info(`Server Running on port ${process.env.PORT}`);
});

const io = new socket.Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {

    socket.on('room', (id) => {
        socket.join(id);
    })


    socket.on("sendMessage", (message) => {
        const { chat, sender } = message;
        const { users } = chat;
        users.forEach((user: any) => {
            if (user._id.toString() !== sender._id.toString()) {
                socket.to(chat._id).emit("receiveMessage", message);
            }
        })
    });

});