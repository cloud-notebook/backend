import express, { Application } from "express";
import dotenv from 'dotenv';
import errorMiddleware from "./middleware/error.middleware";
import userRouter from "./routes/user.routes";
import Connect from "./config/database.config";
import logger from "./config/logger";
import morganMiddleware from "./middleware/morgan.middleware";


const app: Application = express();

//Enviorment variable
dotenv.config();

//JSON Parser
app.use(express.json());

//Database Configration
Connect();

//morgan middleware
app.use(morganMiddleware);

//Endpoints
app.use("/api/v1/user", userRouter);

//Error Middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    logger.info(`Server Running on port ${process.env.PORT}`);
});