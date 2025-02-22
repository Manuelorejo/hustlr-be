import { signjwt } from "../utils/jwt";
import { User } from "../features/auth/auth.model";

export default class JWTRepo {
  static signAccessToken = (
    user: Omit<User, "__v" | "password" | "confirmPassword">
  ) => {
    const accessToken = signjwt(user, "accessTokenPrivateKey", {
      expiresIn: "30d",
    });
    return accessToken;
  };
}