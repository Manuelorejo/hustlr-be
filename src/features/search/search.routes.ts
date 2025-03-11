import { Router } from "express";
import validate from "../../middleware/validate";
import { searchSchema } from "./search.validation";
import SearchController from "./search.controller";

const searchRoutes = Router();

searchRoutes.get("/", validate(searchSchema), SearchController.scrapeJobs);

export default searchRoutes;