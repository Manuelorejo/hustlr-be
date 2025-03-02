import { DocumentType } from "@typegoose/typegoose";
import UserModel, { User } from "./auth.model";

export default class AuthRepo {
  static findByEmail = async (email: string): Promise<DocumentType<User> | null> => {
    return await UserModel.findOne({ email }).exec();
  };

  static findById = async (id: string): Promise<DocumentType<User> | null> => {
    return await UserModel.findById(id).exec();
  };

  static createUser = async (
    user: Omit<User, "confirmPassword" | "setPassword">,
  ): Promise<DocumentType<User>> => {
    return await UserModel.create(user);
  };

}
