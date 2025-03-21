import { Router } from "express";
import validate from "../../middleware/validate";
import deserialize from "../../middleware/deserializeUser";
import BookmarksController from "./bookmarks.controller";
import { addBookmarkSchema, removeBookmarkSchema } from "./bookmarks.validation";
const bookmarkRoutes = Router();


bookmarkRoutes.post("/add", deserialize, validate(addBookmarkSchema), BookmarksController.addBookmark);
bookmarkRoutes.delete("/remove/:bookmarkId", deserialize, validate(removeBookmarkSchema), BookmarksController.removeBookmark);
bookmarkRoutes.get("/list", deserialize, BookmarksController.getBookmarks);
bookmarkRoutes.delete("/clear", deserialize, BookmarksController.clearBookmarks);

export default bookmarkRoutes;