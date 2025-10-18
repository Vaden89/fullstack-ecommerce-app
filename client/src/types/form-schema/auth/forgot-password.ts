import z from "zod";

export const reqPasswordResetSchema = z.object({
  email: z.email(),
});

export type ReqPasswordResetData = z.infer<typeof reqPasswordResetSchema>;

export const forgotPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirm_password: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;
