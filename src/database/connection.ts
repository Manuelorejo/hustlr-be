import mongoose from "mongoose";
import config from "config";

const dbURI = config.get<string>("dbURI");

export default async function connect() {
  try {
    if (!dbURI) {
      throw new Error("dbURI is not defined in the config.");
    }
    await mongoose.connect(dbURI);
    console.log("Database connected");
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Could not connect to the database: ${error.message}`);
    } else {
      console.error(
        "An unknown error occurred while connecting to the database.",
      );
    }
    process.exit(1);
  }
}
