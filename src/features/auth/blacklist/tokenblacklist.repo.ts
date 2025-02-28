import TokenBlacklistModel from "./tokenblacklist.model";

export default class TokenBlacklistRepo {
  /**
   * Blacklist a refresh token with its expiration time
   * @param token - Refresh token to be blacklisted
   * @param expiresAt - Expiration date of the refresh token
   */
  static async blacklistToken(token: string, expiresAt: Date) {
    return await TokenBlacklistModel.create({ token, expiresAt });
  }

  /**
   * Check if a refresh token is blacklisted
   * @param token - Refresh token to check
   * @returns true if blacklisted, false otherwise
   */
  static async isTokenBlacklisted(token: string): Promise<boolean> {
    return !!(await TokenBlacklistModel.exists({ token }));
  }
}
