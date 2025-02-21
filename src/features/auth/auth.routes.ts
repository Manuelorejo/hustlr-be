import { Router } from "express";
import validate from "../../middleware/validate";
import { signUpSchema } from "./auth.validation";
import AuthController from "./auth.controller";
const authRoutes = Router();

authRoutes.post("/signup", validate(signUpSchema), AuthController.signup);
export default authRoutes;
