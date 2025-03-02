import ProfileRepo from "./profile.repo";
import { Request, Response, NextFunction } from "express";
import APIResponse from "../../utils/response";
import { ProfileUpdateInput, PasswordChangeInput } from "./profile.validation";

export default class ProfileController {
  static getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Ensure user ID is available from authentication middleware
      const userId = res.locals.user;
      if (!userId) {
        return APIResponse.error(
          "Unauthorized",
          401,
          "Authentication required"
        ).send(res);
      }

      // Fetch user details
      const user = await ProfileRepo.findById(userId);
      if (!user) {
        return APIResponse.error(
          "User not found",
          404,
          "Profile not found"
        ).send(res);
      }

      // Exclude sensitive data (e.g., password)
      const profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      return APIResponse.success(
        profile,
        "Profile retrieved successfully",
        200
      ).send(res);
    } catch (error) {
      next(error);
    }
  };

  static updateProfile = async (
    req: Request<{}, {}, ProfileUpdateInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.user;
      if (!userId) {
        return APIResponse.error(
          "Unauthorized",
          401,
          "Authentication required"
        ).send(res);
      }

      const { firstName, lastName } = req.body;

      // Ensure at least one field is being updated
      if (!firstName && !lastName) {
        return APIResponse.error(
          "Bad Request",
          400,
          "At least one field (firstName or lastName) must be provided"
        ).send(res);
      }

      // Update user profile
      const updatedUser = await ProfileRepo.findByIdAndUpdate(userId, {
        firstName,
        lastName,
      });

      if (!updatedUser) {
        return APIResponse.error(
          "User not found",
          404,
          "Profile not found"
        ).send(res);
      }

      // Return updated profile
      const updatedProfile = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      };

      return APIResponse.success(
        updatedProfile,
        "Profile updated successfully",
        200,
        "Profile updated successfully"
      ).send(res);
    } catch (error) {
      next(error);
    }
  };

  static changePassword = async (
    req: Request<{}, {}, PasswordChangeInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = res.locals.user;
      if (!userId) {
        return APIResponse.error(
          "Unauthorized",
          401,
          "Authentication required"
        ).send(res);
      }
      const existingUser = await ProfileRepo.findById(userId);
      if (!existingUser) {
        return APIResponse.error(
          "User not found",
          404,
          "Profile not found"
        ).send(res);
      }

      const isPasswordValid = await existingUser?.confirmPassword(
        currentPassword
      );
      if (!isPasswordValid) {
        return APIResponse.error(
          "Invalid current password!",
          400,
          "Incorrect current password. Please try again."
        ).send(res);
      }

      existingUser.password = newPassword;
      await existingUser.save();

      return APIResponse.success(
        null,
        "Password change successful",
        200,
        "Your password has been changed successfully. You can now use your new password at the next login."
      ).send(res);
    } catch (error) {
      next(error);
    }
  };


  static deleteAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.user;
  
      if (!userId) {
        return APIResponse.error(
          "Unauthorized",
          401,
          "Authentication required"
        ).send(res);
      }
  
      // Find and delete the user
      const deletedUser = await ProfileRepo.deleteById(userId);
      if (!deletedUser) {
        return APIResponse.error(
          "User not found",
          404,
          "Account does not exist"
        ).send(res);
      }
  
      return APIResponse.success(
        null,
        "Account deleted successfully",
        200
      ).send(res);
    } catch (error) {
      next(error);
    }
  };
  
}
