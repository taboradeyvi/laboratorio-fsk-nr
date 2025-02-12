import express from "express";
import swaggerSetup from "./src/config/swagger.js";
import patientRoutes from "./src/routes/patient.js";
import symptomRoutes from "./src/routes/symptom.js";
import userRoutes from "./src/routes/user.js";

const app = express();

app.use(express.json());

swaggerSetup(app);

app.use("/patients", patientRoutes);
app.use("/symptoms", symptomRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
