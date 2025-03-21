import { object, string, TypeOf } from "zod";

// Schema for adding a bookmark
export const addBookmarkSchema = object({
  body: object({
    job_title: string({
      required_error: "Job title is required",
    }),
    job_location: string({
      required_error: "Job location is required",
    }).nullable(),
    job_link: string({
      required_error: "Job link is required",
    }).url("Invalid job link URL"),
    job_mode: string().nullable(),
    job_source: string({
      required_error: "Job source is required",
    }),
  }),
});

// Schema for removing a bookmark by its ID
export const removeBookmarkSchema = object({
  params: object({
    bookmarkId: string({
      required_error: "Bookmark ID is required",
    }),
  }),
});

export type AddBookmarkInput = TypeOf<typeof addBookmarkSchema>["body"];
export type RemoveBookmarkInput = TypeOf<typeof removeBookmarkSchema>["params"];
