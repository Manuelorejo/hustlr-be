import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "../auth.model";

class PasswordResetToken {
  @prop({ required: true, ref: () => User })
  userId!: Ref<User>;

  @prop({ required: true })
  token!: string;

  @prop({ required: true, expires: 0 })
  expiresAt!: Date;
}

const PasswordResetTokenModel = getModelForClass(PasswordResetToken);
export default PasswordResetTokenModel;
