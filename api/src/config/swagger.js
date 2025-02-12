import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Pacientes y Síntomas",
      version: "1.0.0",
      description: "Documentación de la API usando OpenAPI 3.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const generateSwaggerFile = () => {
  const swaggerJSONPath = "./swagger.json";
  fs.writeFileSync(swaggerJSONPath, JSON.stringify(swaggerSpec, null, 2));
  console.log("✅ Archivo swagger.json generado correctamente");
};

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  generateSwaggerFile();
};

export default swaggerDocs;
