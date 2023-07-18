import mongoose, { set } from "mongoose";
import logger from "./logger";


export default async function (): Promise<void> {
    set("strictQuery", false);
    try {
        await mongoose.connect("mongodb+srv://shami:AliAli12@notebook.wrjlx8b.mongodb.net/Notebook");
        const connection = mongoose.connection;
        connection.once("open", () => {
            logger.info("Database Connected");
        });
        connection.on("error", console.error.bind(console, "Connection Error"));
    }
    catch (e: any) {
        logger.error(e.message);
    }
}