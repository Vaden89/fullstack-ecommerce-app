"use server";

import { axiosPost } from "@/lib/api";
import { utapi } from "@/lib/uploadthing";
import { collectErrorMessages } from "@/lib/utils";
import { ErrorResponse, SuccessResponse } from "@/types/actions";
import {
  AddProductFormData,
  addProductSchema,
} from "@/types/form-schema/product/add-product";
import z from "zod";

export const createProductAction = async (_: any, formData: FormData) => {
  let rawData: AddProductFormData | null = null;
  try {
    rawData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      images: formData.getAll("images") as File[],
    };

    const validatedData = addProductSchema.safeParse(rawData);

    if (!validatedData.success) {
      const errorMessage = collectErrorMessages(
        z.treeifyError(validatedData.error),
      );

      return {
        inputs: rawData,
        message: "",
        error: errorMessage,
      } as ErrorResponse & { inputs: AddProductFormData };
    }

    let uploadedImageUrls: string[] = [];
    const validImageFiles = validatedData.data.images.filter(
      (file) => file.size > 0,
    );

    if (validImageFiles.length > 0) {
      try {
        const uploadResult = await utapi.uploadFiles(validImageFiles, {
          concurrency: validImageFiles.length,
        });

        uploadedImageUrls = uploadResult
          .filter((result) => result.data !== null)
          .map((result) => result.data.ufsUrl);
      } catch (error) {
        return {
          inputs: rawData,
          message: "",
          error: "Failed to upload images, please try again.",
        } as ErrorResponse & { inputs: AddProductFormData };
      }
    }

    const response = await createProduct({
      ...validatedData.data,
      images: uploadedImageUrls,
    });

    if (!("data" in response)) {
      if (uploadedImageUrls.length > 0) {
        try {
          const fileIds = uploadedImageUrls
            .map((url) => {
              try {
                const urlObj = new URL(url);
                const pathname = urlObj.pathname.replace(/\/$/, "");
                const segments = pathname.split("/");
                return segments[segments.length - 1];
              } catch {
                return null;
              }
            })
            .filter((id): id is string => id !== null);

          if (fileIds.length > 0) {
            await utapi.deleteFiles(fileIds);
          }
        } catch {
          return {
            ...response,
            inputs: rawData,
          } as ErrorResponse & { inputs: AddProductFormData };
        }
      }

      return {
        ...response,
        inputs: rawData,
      } as ErrorResponse & { inputs: AddProductFormData };
    }

    return {
      inputs: rawData,
      ...response,
    } as SuccessResponse<null> & { inputs: AddProductFormData };
  } catch (error) {
    return {
      inputs: rawData,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Something went wrong",
    } as ErrorResponse & { inputs: AddProductFormData };
  }
};

const createProduct = async (payload: any) => {
  const url = "/products";
  const response = await axiosPost<SuccessResponse<null>>(url, payload);

  if (!("data" in response)) {
    return response as ErrorResponse;
  }

  return response;
};
