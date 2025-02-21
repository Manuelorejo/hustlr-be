import { DocumentType } from "@typegoose/typegoose";
import UserModel, { User } from "./auth.model";

export default class AuthRepo {
  static findByEmail = async (email: string): Promise<User | null> => {
    return await UserModel.findOne({ email });
  };

  static createUser = async (
    user: Omit<User, "confirmPassword">,
  ): Promise<DocumentType<User>> => {
    return await UserModel.create(user);
  };
}
