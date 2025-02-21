import dotenv from "dotenv";
dotenv.config();
import express, { Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection";
import router from "./index.routes";
import deserialize from "./middleware/deserializeUser";

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

var corOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  setHeaders: function (res: Response, path: string, stat: any) {
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  },
};

app.use(express.json());
app.use(cors(corOptions));
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
