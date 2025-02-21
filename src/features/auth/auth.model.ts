import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Severity,
} from "@typegoose/typegoose";
import * as argon2 from "argon2";

export const privateFields = ["password", "__v"];

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<User>("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await argon2.hash(this.password);
})
export class User {
  @prop({ required: true, trim: true })
  firstName!: string;

  @prop({ required: true, trim: true })
  lastName!: string;

  @prop({ required: true, trim: true })
  password!: string;

  @prop({ unique: true, required: true, lowercase: true, trim: true })
  email!: string;

  async confirmPassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (error) {
      console.error("Password verification error:", error);
      return false;
    }
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
