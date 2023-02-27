import { connect, connection, set } from "mongoose";
import logger from "./logger";


export default async function (): Promise<void> {
    set("strictQuery", false);
    await connect("mongodb://0.0.0.0:27017/university-project-notebook", function () {
        logger.info("Databse Connected");
    });
    connection.on("connected", function (db) {

    })
    connection.on("error", console.error.bind(console, "Connection Error"));
    connection.once("open", () => {
        console.log(`Database Connected Successfully.`);
    });
}