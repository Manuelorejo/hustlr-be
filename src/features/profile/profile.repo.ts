import { DocumentType } from "@typegoose/typegoose";
import UserModel, { User } from "../auth/auth.model";

export default class ProfileRepo {
  static findById = async (id: string): Promise<DocumentType<User> | null> => {
    return await UserModel.findById(id).exec();
  };

  static findByIdAndUpdate = async(
    id:string,
    updateData : Partial<User>
  ):Promise<DocumentType<User> | null> => {
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  static deleteById = async (id: string): Promise<DocumentType<User> | null> => {
    return await UserModel.findByIdAndDelete(id);
  };
  
}
