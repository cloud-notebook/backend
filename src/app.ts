import express, { Application } from "express";
import dotenv from 'dotenv';
import errorMiddleware from "./middleware/error.middleware";
import userRouter from "./routes/user.routes";

const app: Application = express();

//Enviorment variable
dotenv.config();

app.use(express.json());

app.use("/api/v1/user", userRouter);


//Error Middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server Running On The Port ${process.env.PORT}`);
});