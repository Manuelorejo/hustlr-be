import { Router } from "express";
import validate from "../../middleware/validate";
import ProfileController from "./profile.controller";
import deserialize from "../../middleware/deserializeUser";
const profileRoutes = Router()

profileRoutes.get("/",deserialize, ProfileController.getProfile);
export default profileRoutes;