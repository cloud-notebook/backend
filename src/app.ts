import express, { Application, Request, Response } from "express";


const app: Application = express();
const port: number = 3000;


app.get("/", function (req: Request, res: Response): Response {
    return res.send("Server Running");
});

app.listen(port, () => {
    console.log(`Server Running On The Port ${port}`);
});