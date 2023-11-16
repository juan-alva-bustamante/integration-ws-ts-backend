import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

console.log(process.env.ENV);
if (!process.env.ENV || process.env.ENV == "localhost")
    app.listen(8002, () => {
        console.log("http://localhost:8002");
    });
else
    module.exports = app;