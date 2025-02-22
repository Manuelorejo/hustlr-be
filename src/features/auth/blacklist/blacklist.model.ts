import { getModelForClass, prop } from "@typegoose/typegoose";

class Blacklist {
  @prop({ required: true, unique: true })
  token!: string;

  @prop({ default: Date.now, expires: "7d" }) // Tokens expire in 7 days
  createdAt?: Date;
}

const BlacklistModel = getModelForClass(Blacklist);
export default BlacklistModel;
