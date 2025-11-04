"use server";

import { auth } from "@/app/(auth)/auth";
import { axiosDelete, axiosGet, axiosPost } from "@/lib/api";
import { utapi } from "@/lib/uploadthing";
import { collectErrorMessages } from "@/lib/utils";
import {
  ErrorResponse,
  PaginatedSuccessReponse,
  Response,
  SuccessResponse,
} from "@/types/actions";
import {
  AddProductFormData,
  addProductSchema,
} from "@/types/form-schema/product/add-product";
import { Product } from "@/types/product";
import { AxiosError } from "axios";
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
  const session = await auth();
  const authToken = session?.user?.access_token ?? "";

  const url = "/admin/products";
  const response = await axiosPost<SuccessResponse<null>>(url, payload, {
    config: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  });

  if (!("data" in response)) {
    return response as ErrorResponse;
  }

  return response;
};

export const getProductAction = async (
  page: number,
  limit: number,
  q: string,
) => {
  try {
    const url = `/products`;
    const response = await axiosGet<PaginatedSuccessReponse<Product[]>>(url, {
      params: {
        page,
        limit,
        q,
      },
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string; error: string }>;
    let errorMessage = "";

    if (!error.response) {
      errorMessage = "Unable to reach server, try again later.";
    } else {
      errorMessage =
        error.response?.data.message ?? "Unexpected Error occurred";
    }

    throw new Error(errorMessage);
  }
};

export const deleteProductAction = async (_: any, formData: FormData) => {
  const session = await auth();
  const authToken = session?.user?.access_token ?? "";

  const productId = formData.get("id") as string;

  if (typeof productId != "string" || productId) {
    return {
      error: "Product Id is missing or invalid.",
      message: "Could not delete product",
    } as ErrorResponse;
  }

  const url = `/admin/products/${productId}`;
  const response = await axiosDelete<SuccessResponse<null>>(url, {
    config: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  });

  if (!("data" in response)) {
    return response as ErrorResponse;
  }

  return response;
};
