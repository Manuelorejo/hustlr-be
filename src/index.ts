import dotenv from "dotenv";
dotenv.config();
import express, {Response} from "express";
import swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import connect from "./database/connection";
import router from "./index.routes";
import deserialize from "./middleware/deserializeUser";
import cors from "cors";
import axios from "axios";

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
      url: "http://localhost:8000/api/",
      description: "Development server",
    },
    {
      url: "https://hustlr-be.onrender.com",
      description:"Production Server"
    }
  ],
};
const options = {
  swaggerDefinition,
  apis: ["./src/features/**/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);

var corOptions = {
  origin: ["http://localhost:5173", "https://hustlr-mu.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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




const url = `https://hustlr-be.onrender.com/`;
const interval = 30000;

//Reloader Function
function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(reloadWebsite, interval);

