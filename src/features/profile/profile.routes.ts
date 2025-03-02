import { Router } from "express";
import validate from "../../middleware/validate";
import ProfileController from "./profile.controller";
import deserialize from "../../middleware/deserializeUser";
import { profileUpdateSchema, passwordChangeSchema } from "./profile.validation";
const profileRoutes = Router()

profileRoutes.get("/",deserialize, ProfileController.getProfile);
profileRoutes.patch("/", validate(profileUpdateSchema), deserialize, ProfileController.updateProfile)
profileRoutes.patch("/change-password",validate(passwordChangeSchema), deserialize, ProfileController.changePassword)
profileRoutes.delete("/delete-account", deserialize, ProfileController.deleteAccount)
export default profileRoutes;