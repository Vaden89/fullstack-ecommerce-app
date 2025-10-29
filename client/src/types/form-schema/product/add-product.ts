import z from "zod";

export const addProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Product name must be at least 2 characters long" }),
  description: z.string().trim().min(10, {
    message: "Product description must be at least 10 characters long",
  }),
  price: z.number().min(1, { message: "Product price must be at least 1" }),
  quantity: z
    .number()
    .min(1, { message: "Product quantity must be at least 1" }),
  images: z
    .array(z.file())
    .min(1, { message: "Product must have at least 1 image" }),
});

export type AddProductFormData = z.infer<typeof addProductSchema>;
