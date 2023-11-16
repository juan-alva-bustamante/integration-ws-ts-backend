import app from "./app";
import * as dotenv from "dotenv";

dotenv.config();

app.listen(3000, () => {
    console.log("App corriendo en puerto 3000");
});