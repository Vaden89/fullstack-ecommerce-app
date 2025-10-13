import z from "zod";

export const registerFormData = z.object({
  email: z.email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z
    .string()
    .min(8, { error: "Passwords must be atleast 8 characters long" }),
});

export type RegisterFormData = z.infer<typeof registerFormData>;
