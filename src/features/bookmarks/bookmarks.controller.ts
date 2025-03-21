import { Request, Response, NextFunction } from "express";
import BookmarkRepo from "./bookmarks.repo";
import APIResponse from "../../utils/response";
import { AddBookmarkInput, RemoveBookmarkInput } from "./bookmarks.validation";

export default class BookmarksController {
  static async addBookmark(req: Request<{}, {}, AddBookmarkInput>, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.user._id;
      const { job_title, job_location, job_link, job_mode, job_source } = req.body;

      if (!job_link) {
        return APIResponse.error(
          "Job link is required",
          400,
          "A job link must be provided to bookmark a job."
        ).send(res);
      }

      const bookmark = await BookmarkRepo.addBookmark(userId, {
        jobTitle : job_title,
        jobLocation : job_location,
        jobLink : job_link,
        jobMode : job_mode,
        jobSource : job_source,
      });

      return APIResponse.success(
        bookmark,
        "Bookmark added successfully",
        201,
        "Bookmark addedd successfully"
      ).send(res);
    } catch (error) {
      next(error);
    }
  }

  static async removeBookmark(
    req: Request<RemoveBookmarkInput, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    try {
        const userId = res.locals.user._id;
      console.log(userId)
      const { bookmarkId } = req.params;
      console.log(bookmarkId)
  
      if (!bookmarkId) {
        return APIResponse.error(
          "Bookmark ID is required",
          400,
          "A bookmark ID must be provided to remove a bookmark."
        ).send(res);
      }
  
      // Check if the bookmark exists
      const bookmark = await BookmarkRepo.findById(bookmarkId);
      if (!bookmark || bookmark.user.toString() !== userId) {
        return APIResponse.error(
          "Bookmark not found",
          404,
          "The bookmark you tried to remove does not exist."
        ).send(res);
      }
  
      // Proceed with deletion
      await BookmarkRepo.removeBookmark(userId, bookmarkId);
  
      return APIResponse.success(
        null,
        "Bookmark removed successfully",
        200,
        "Bookmark removed successfully"
      ).send(res);
    } catch (error) {
      next(error);
    }
  }
  
  

  static async clearBookmarks(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.user._id;
      await BookmarkRepo.clearBookmarks(userId);
      return APIResponse.success(null, "All bookmarks cleared successfully", 200).send(res);
    } catch (error) {
      next(error);
    }
  }

  static async getBookmarks(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = res.locals.user._id;
      const bookmarks = await BookmarkRepo.getUserBookmarks(userId);
      return APIResponse.success(bookmarks, "Bookmarks retrieved successfully", 200).send(res);
    } catch (error) {
      next(error);
    }
  }
}
