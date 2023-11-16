import mongoose, {Connection} from "mongoose";
import { ProcessEncryptedData } from "../../utils";

export class AwsDocumentDB {

    private static database: Connection = null as any;

    public static async connectDatabase() {
        if (!AwsDocumentDB.database) {
            console.log('connectDatabase new mongo instance...');
            return await AwsDocumentDB.localConnection();
        } else {
            console.log('connectDatabase reuse mongo instance.');
            return AwsDocumentDB.database;
        }
    }

    private static getUrlConnection() {
        const processEncryptedData = new ProcessEncryptedData();
        const user = processEncryptedData.decryptData("U2FsdGVkX18nE1Wzpm9WwjyWQhgRfaG8AG42Vuo4dd0=");
        const password = processEncryptedData.decryptData("U2FsdGVkX1/JXNnWipDZSp5bqqLkBm9WWP5dVzr1Y+3NRzkdhl1qeCX39UWFDVL4");
        const localConnection = `mongodb://localhost:27017/deployment`;
        // return localConnection;
        return `mongodb+srv://${user}:${password}$@deployment-request.t8uji3o.mongodb.net/deployment-request`;
    }

    private static async localConnection() {
        const url = AwsDocumentDB.getUrlConnection();
        const connected = await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("Connection NEW MONGO CONNECTION...");
        return AwsDocumentDB.database = connected.connection;
    }

    public static closeConnection() {
        console.log("Closing mongo connection ...")
        if (!AwsDocumentDB.database) {
            return;
        }
        mongoose.disconnect();
        return true;
    }

    public validateConnection() {
        console.log("ValidateConnection method... ");

        if (!AwsDocumentDB.database) {
            console.log('ValidateConnection new mongo instance...');
            AwsDocumentDB.database = mongoose.connection;
        } else {
            console.log('ValidateConnection reuse mongo instance.');
        }

        // When mentioned database is available and successfully connects
        AwsDocumentDB.database.once('open', async () => {
            console.log('ValidateConnection > Connected to database successfully');
        });

        // In case of any error
        AwsDocumentDB.database.on('error', () => {
            console.log(`ValidateConnection > Error connecting to database. `);
        });
    }
}
