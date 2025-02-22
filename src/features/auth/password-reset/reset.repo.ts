import crypto from "crypto";
import UserModel from "../auth.model";
import PasswordResetTokenModel from "./reset.model";

export default class PasswordResetRepo {
  static async generatePasswordResetToken(userId: string) {
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Store the token in the database with an expiry
    await PasswordResetTokenModel.create({
      userId,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });

    return token;
  }

  static async findPasswordResetToken(token: string) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return PasswordResetTokenModel.findOne({
      token: hashedToken,
      expiresAt: { $gt: new Date() },
    });
  }

  static async deletePasswordResetToken(userId: string) {
    return PasswordResetTokenModel.deleteMany({ userId });
  }
}
