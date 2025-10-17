import z from "zod";

export const reqPasswordResetSchema = z.object({
  email: z.email(),
});

export type ReqPasswordResetData = z.infer<typeof reqPasswordResetSchema>;

export const forgotPasswordFormSchema = z.object({
  email: z.email(),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;
