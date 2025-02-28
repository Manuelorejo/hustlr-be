import { getModelForClass, prop } from "@typegoose/typegoose";

class TokenBlacklist {
  @prop({ required: true, unique: true })
  token!: string;

  @prop({ required: true })
  expiresAt!: Date;
}

const TokenBlacklistModel = getModelForClass(TokenBlacklist);
export default TokenBlacklistModel;
