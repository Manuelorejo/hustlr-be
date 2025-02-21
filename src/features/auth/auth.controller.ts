import { Request, Response, NextFunction } from "express";
import AuthRepo from "./auth.repo";
import APIResponse from "../../utils/response";

export default class AuthController {
  static signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      // 1️⃣ Check if email already exists
      const existingUser = await AuthRepo.findByEmail(email);
      if (existingUser) {
        return APIResponse.error("Email already in use", 409).send(res);
      }

      // 2️⃣ Create user
      const newUser = await AuthRepo.createUser({
        firstName,
        lastName,
        email,
        password,
      });

      // 3️⃣ Send success response
      return APIResponse.success(
        null,
        "User registered successfully",
        201,
      ).send(res);
    } catch (error) {
      next(error);
    }
  };
}
