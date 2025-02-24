import dotenv from "dotenv";
dotenv.config();
import express, { Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import connect from "./database/connection";
import router from "./index.routes";
import deserialize from "./middleware/deserializeUser";
import cors from "cors";
import corsOptions from "../config/cors"; 

const app = express();

const port = process.env.PORT || 8000;
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Hustlr API Documentation",
    version: "1.0.0",
    description: "API documentation for Hustlr",
  },
  servers: [
    {
      url: "http://localhost:8000",
      description: "Development server",
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ["./src/features/**/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());
app.options("*", cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.disable("x-powered-by");

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(deserialize);
app.use("/api", router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  connect();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hustlr" });
});
