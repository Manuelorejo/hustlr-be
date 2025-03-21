import { DocumentType } from "@typegoose/typegoose";
import BookmarkModel, { Bookmark } from "./bookmarks.model";

export default class BookmarkRepo {
  static async addBookmark(
    userId: string,
    bookmarkData: Omit<Bookmark, "user">
  ): Promise<DocumentType<Bookmark>> {
    return await BookmarkModel.create({ user: userId, ...bookmarkData });
  }

  static async removeBookmark(
    userId: string,
    bookmarkId: string
  ): Promise<DocumentType<Bookmark> | null> {
    return await BookmarkModel.findOneAndDelete({ user: userId, _id: bookmarkId }).exec();
  }

  static async clearBookmarks(userId: string): Promise<void> {
    await BookmarkModel.deleteMany({ user: userId }).exec();
  }

  static async getUserBookmarks(userId: string): Promise<DocumentType<Bookmark>[]> {
    return await BookmarkModel.find({ user: userId }).exec();
  }


  static async findById(bookmarkId: string): Promise<DocumentType<Bookmark> | null> {
    return await BookmarkModel.findById(bookmarkId).exec();
  }
  
}
