import express, { Application } from "express";
import dotenv from 'dotenv';
import errorMiddleware from "./middleware/error.middleware";
import authController from "./controllers/auth.controller";
import noteController from "./controllers/note.controller";
import Connect from "./config/database.config";
import logger from "./config/logger";
import morganMiddleware from "./middleware/morgan.middleware";


const app: Application = express();

//Environment variable
dotenv.config();

//JSON Parser
app.use(express.json());

//Database Configuration
Connect().catch((e:any)=>{
    console.log(e);
});

//morgan middleware
app.use(morganMiddleware);

//Endpoints
app.use("/api/v1/auth", authController);
app.use("/api/v1/note", noteController);

//Error Middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    logger.info(`Server Running on port ${process.env.PORT}`);
});