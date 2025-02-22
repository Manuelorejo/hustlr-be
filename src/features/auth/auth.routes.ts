import { Router } from "express";
import validate from "../../middleware/validate";
import { signUpSchema, loginSchema } from "./auth.validation";
import AuthController from "./auth.controller";
import deserialize from "../../middleware/deserializeUser";
const authRoutes = Router();


authRoutes.post("/signup", validate(signUpSchema), AuthController.signup);
authRoutes.post("/login", validate(loginSchema), AuthController.login);
authRoutes.post("/logout", deserialize, AuthController.logout);
export default authRoutes;
