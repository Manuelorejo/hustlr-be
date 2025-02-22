import { Request, Response, NextFunction } from "express";
import AuthRepo from "./auth.repo";
import APIResponse from "../../utils/response";
import JWTRepo from "../../database/jwt.repo";
import { SignUpInput, LoginInput } from "./auth.validation";

export default class AuthController {
  static signup = async (
    req: Request<{}, {}, SignUpInput>,
    res: Response,
    next: NextFunction
  ) => {
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
        201
      ).send(res);
    } catch (error) {
      next(error);
    }
  };

  static login = async (
    req: Request<{}, {}, LoginInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      // 1️⃣ Find user by email
      const existingUser = await AuthRepo.findByEmail(email);
      if (!existingUser) {
        return APIResponse.error("User with email does not exist!", 404).send(
          res
        );
      }

      // 2️⃣ Verify password
      const isPasswordValid = await existingUser?.confirmPassword(password);
      if (!isPasswordValid) {
        return APIResponse.error("Invalid email or password!", 400).send(res);
      }

      // 3️⃣ Generate access token
      const { password: _, ...rest } = existingUser?.toObject();
      const accessToken = JWTRepo.signAccessToken(rest);

      // 4️⃣ Send success response
      return APIResponse.success(
        {
          accessToken,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
        },
        "Login successful",
        200
      ).send(res);
    } catch (error) {
      next(error);
    }
  };
}
