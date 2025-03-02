import { object, string, TypeOf } from "zod";

export const profileUpdateSchema = object({
  body: object({
    firstName: string()
      .min(2, "First name must be at least 2 characters long")
      .optional(),

    lastName: string()
      .min(2, "Last name must be at least 2 characters long")
      .optional(),
  }).refine((data) => data.firstName || data.lastName, {
    message: "Either first name or last name is required",
  }),
});

export type ProfileUpdateInput = TypeOf<typeof profileUpdateSchema>["body"];


export const passwordChangeSchema = object({
  body: object({
    currentPassword: string({
      required_error: "Current password is required",
    }),

    newPassword: string({
      required_error: "New password is required",
    })
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      ),

    confirmNewPassword: string({
      required_error: "Confirm new password is required",
    }),
  }).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export type PasswordChangeInput = TypeOf<typeof passwordChangeSchema>["body"];
