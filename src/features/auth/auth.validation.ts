import { object, string, TypeOf } from "zod";

export const signUpSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),

    lastName: string({
      required_error: "Last name is required",
    }),

    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),

    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
      ),

    confirmPassword: string({
      required_error: "Confirm password is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),

    password: string({
      required_error: "Password is required",
    }),
  }),
});

export type SignUpInput = TypeOf<typeof signUpSchema>["body"];
export type LoginInput = TypeOf<typeof loginSchema>["body"];
