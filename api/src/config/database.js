import "dotenv/config";
import mongoose from "mongoose";

class databaseClient {
  constructor() {
    this.connectDB();
  }

  async connectDB() {
    try {
      //The user is temporary and will be deleted within 3 days
      const connectionString =
        "mongodb+srv://develop:n0zPhYRlhjeCXO9a@develop.fkzwu.mongodb.net/tabora?retryWrites=true&w=majority&appName=develop";
      // const connectionString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.SERVER_DB}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_APPNAME}`;
      console.log("aqui");
      await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("✅ Database connected successfully");

      mongoose.connection.on("error", (err) => {
        console.error("❌ Database connection error:", err);
      });

      mongoose.connection.on("disconnected", () => {
        console.warn("⚠️ Database disconnected");
      });
    } catch (error) {
      console.error("❌ Error connecting to the database:", error);
      process.exit(1);
    }
  }

  async closeConnection() {
    try {
      await mongoose.disconnect();
      console.log("⚠️ Database disconnected");
    } catch (error) {
      console.error("❌ Error disconnecting from database:", error);
    }
  }
}

export default new databaseClient();
