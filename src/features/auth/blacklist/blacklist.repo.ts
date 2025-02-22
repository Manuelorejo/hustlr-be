import BlacklistModel from "./blacklist.model";

export default class BlacklistRepo {
    static blacklistToken = async (token: string) => {
        return await BlacklistModel.create({ token });
      };
    
      static isTokenBlacklisted = async (token: string) => {
        return await BlacklistModel.exists({ token });
      };
}