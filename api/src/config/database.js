import 'dotenv/config';
import mongoose from 'mongoose';

class databaseClient {
    constructor(){
        this.connectDB();
    }

    async connectDB(){
        const connectionString = 
        `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}${process.env.SERVER_DB}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_APPNAME}`;
        await mongoose.connect(connectionString);
    }

    async closeConnection(){
        await mongoose.disconnect();
    }
}

export default new databaseClient();