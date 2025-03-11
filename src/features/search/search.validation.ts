import { query } from "express";
import { object, string, TypeOf } from "zod";

export const searchSchema = object({
  query: object({
    title: string({
      required_error: "Job title is required",
    }).min(2, "Job title must be at least 2 characters long"),
    
    location: string().optional()
  })
});

export type SearchInputs = TypeOf<typeof searchSchema>;
