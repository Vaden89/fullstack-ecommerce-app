import z from "zod";

export const loginFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
