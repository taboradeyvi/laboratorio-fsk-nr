import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import swaggerSetup from "./src/config/swagger.js";
import patientRoutes from "./src/routes/patient.js";
import symptomRoutes from "./src/routes/symptom.js";
import userRoutes from "./src/routes/user.js";
import "./src/config/database.js";
import errorHandler from "./src/middlewares/errorHandler.js";

const app = express();

app.use(bodyParser.json());

swaggerSetup(app);

app.use("/patients", patientRoutes);
app.use("/symptoms", symptomRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
