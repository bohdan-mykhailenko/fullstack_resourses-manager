import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "Passwords must match",
      path: ["passwordConfirmation"],
    }
  );

export type SignUpFormData = z.infer<typeof signUpSchema>;
