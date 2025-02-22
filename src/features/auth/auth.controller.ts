import { Request, Response, NextFunction } from "express";
import AuthRepo from "./auth.repo";
import APIResponse from "../../utils/response";
import JWTRepo from "../../database/jwt.repo";
import {
  SignUpInput,
  LoginInput,
  PasswordResetRequestInput,
  PasswordResetInput,
} from "./auth.validation";
import BlacklistRepo from "./blacklist/blacklist.repo";
import PasswordResetRepo from "./password-reset/reset.repo";
import sendEmail from "../../services/sendEmail";
import { passwordResetTemplate } from "../../templates/passwordReset";
import * as argon2 from "argon2";

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
      console.log("isPasswordValid", isPasswordValid);
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

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return APIResponse.error("No token provided", 400).send(res);
      }

      // Check if already blacklisted
      const isBlacklisted = await BlacklistRepo.isTokenBlacklisted(token);
      if (isBlacklisted) {
        return APIResponse.error("Token already blacklisted", 400).send(res);
      }

      // Blacklist the token
      await BlacklistRepo.blacklistToken(token);

      return APIResponse.success(null, "Logout successful", 200).send(res);
    } catch (error) {
      next(error);
    }
  };

  static requestPasswordReset = async (
    req: Request<{}, {}, PasswordResetRequestInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;

      // 1️⃣ Find user by email
      const existingUser = await AuthRepo.findByEmail(email);
      if (!existingUser) {
        return APIResponse.error("User with email does not exist!", 404).send(
          res
        );
      }

      // 2️⃣ Delete existing password reset tokens
      await PasswordResetRepo.deletePasswordResetToken(existingUser._id.toString());

      // 3️⃣ Generate reset token
      const resetToken = await PasswordResetRepo.generatePasswordResetToken(
        existingUser._id.toString()
      );

      // Send email with reset link
      const resetLink = `${process.env.FRONTEND_URL}/password-reset/reset?token=${resetToken}`;
      const emailHtml = passwordResetTemplate(resetLink);
      await sendEmail(
        existingUser.email,
        "Password Reset Request",
        emailHtml
      );
      return APIResponse.success(
        null,
        "Password reset link sent to email",
        200
      ).send(res);
    } catch (error) {
      next(error);
    }
  };

  
  static resetPassword = async (req: Request<{}, {}, PasswordResetInput>, res: Response, next: NextFunction) => {
    try {
      const { token, password } = req.body;
  
      // Find valid token
      const validToken = await PasswordResetRepo.findPasswordResetToken(token);
      if (!validToken) {
        return APIResponse.error("Invalid or expired token", 400).send(res);
      }
  
      // Find user
      const user = await AuthRepo.findById(validToken.userId.toString());
      if (!user) {
        return APIResponse.error("User not found", 404).send(res);
      }
  
      user.password = password;
      await user.save();

      // Delete token after successful reset
      await PasswordResetRepo.deletePasswordResetToken(user._id.toString());
  
  
      return APIResponse.success(null, "Password reset successful", 200).send(res);
    } catch (error) {
      next(error);
    }
  };
  
  
  
  
}
