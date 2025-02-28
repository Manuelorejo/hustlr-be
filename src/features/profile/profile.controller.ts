import ProfileRepo from "./profile.repo";
import { Request, Response, NextFunction } from "express";
import APIResponse from "../../utils/response";

export default class ProfileController {

    static getProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
          // Ensure user ID is available from authentication middleware
          const userId = res.locals.user;
          if (!userId) {
            return APIResponse.error("Unauthorized", 401, "Authentication required").send(res);
          }
      
          // Fetch user details
          const user = await ProfileRepo.findById(userId);
          if (!user) {
            return APIResponse.error("User not found", 404, "Profile not found").send(res);
          }
      
          // Exclude sensitive data (e.g., password)
          const profile = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
      
          return APIResponse.success(profile, "Profile retrieved successfully", 200).send(res);
        } catch (error) {
          next(error);
        }
      };

}