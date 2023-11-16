import mongoose, {Connection} from "mongoose";

export class AwsDocumentDB {

    private static database: Connection = null as any;

    public async connectDatabase() {
        if (!AwsDocumentDB.database) {
            console.log('connectDatabase new mongo instance...');
            return await this.localConnection();
        } else {
            console.log('connectDatabase reuse mongo instance.');
            return AwsDocumentDB.database;
        }
    }

    private async localConnection() {
        // const url = "mongodb+srv://juanalva:pgEOTfuJWtwt3WIC$@deployment-request.t8uji3o.mongodb.net/deployment-request";
        const url = "mongodb://localhost:27017/deployment"
        const connected = await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("Connection NEW MONGO CONNECTION...");
        return AwsDocumentDB.database = connected.connection;
    }

    public closeConnection() {
        console.log("Closing mongo connection ...")
        if (!AwsDocumentDB.database) {
            return;
        }
        mongoose.disconnect();
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
