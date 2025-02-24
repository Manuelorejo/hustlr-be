import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: ["http://localhost:5173", "https://hustlr-mu.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsOptions;
