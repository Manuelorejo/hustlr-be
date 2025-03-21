import {
    getModelForClass,
    modelOptions,
    Ref,
    prop,
    Severity,
  } from "@typegoose/typegoose";
  import { User } from "../auth/auth.model";
  
  @modelOptions({
    schemaOptions: {
      timestamps: true,
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })
  export class Bookmark {
    @prop({ ref: () => User, required: true })
    user: Ref<User>;
  
    @prop({ type: String, default: null, trim: true })
    jobTitle?: string | null;
  
    @prop({ type: String, default: null, trim: true })
    jobLocation?: string | null;
  
    @prop({ type: String, default: null, trim: true })
    jobLink?: string | null;
  
    @prop({ type: String, default: null, trim: true })
    jobMode?: string | null;
  
    @prop({ type: String, default: null, trim: true })
    jobSource?: string | null;
  }
  
  const BookmarkModel = getModelForClass(Bookmark);
  export default BookmarkModel;
  