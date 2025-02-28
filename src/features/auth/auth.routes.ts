import { Router } from "express";
import validate from "../../middleware/validate";
import { signUpSchema, loginSchema, passwordResetRequestSchema, passwordResetSchema } from "./auth.validation";
import AuthController from "./auth.controller";
import deserialize from "../../middleware/deserializeUser";
const authRoutes = Router();


authRoutes.post("/signup", validate(signUpSchema), AuthController.signup);
authRoutes.post("/login", validate(loginSchema), AuthController.login);
authRoutes.post("/logout", deserialize, AuthController.logout);
authRoutes.post("/password-reset/request", validate(passwordResetRequestSchema), AuthController.requestPasswordReset);
authRoutes.post("/password-reset/reset", validate(passwordResetSchema), AuthController.resetPassword);
export default authRoutes;
