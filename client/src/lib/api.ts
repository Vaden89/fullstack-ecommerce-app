"use server";
import { signOut } from "@/app/(auth)/auth";
import { ErrorResponse } from "@/types/actions";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";

const instance: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await signOut({ redirect: true, redirectTo: "/login" });
    }

    return Promise.reject(error);
  },
);

export async function axiosGet<T = unknown>(
  url: string,
  {
    params,
    config,
  }: {
    params?: Record<string, string | number>;
    config?: AxiosRequestConfig;
  } = {},
): Promise<T> {
  try {
    const response = await instance.get<T>(url, {
      ...config,
      params,
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError<any>;

    throw error;
  }
}

export async function axiosPost<T = unknown>(
  url: string,
  payload?: unknown,
  { config }: { config?: AxiosRequestConfig } = {},
): Promise<T | ErrorResponse> {
  try {
    const response = await instance.post<T>(url, payload, { ...config });

    return response.data;
  } catch (err) {
    const error = err as AxiosError<any>;

    const data = error.response?.data;

    const errorResponse: ErrorResponse = {
      error:
        data?.error ??
        data?.errors ??
        error.message ??
        "An unexpected error occurred.",
      message:
        data?.message ??
        error.response?.statusText ??
        "Something went wrong while processing your request.",
    };

    return errorResponse;
  }
}

export async function axiosDelete<T = unknown>(
  url: string,
  { config }: { config?: AxiosRequestConfig } = {},
): Promise<T | ErrorResponse> {
  try {
    const response = await instance.delete<T>(url, config);

    return response.data;
  } catch (err) {
    const error = err as AxiosError<any>;

    const data = error.response?.data;

    const errorResponse: ErrorResponse = {
      error:
        data?.error ??
        data?.errors ??
        error.message ??
        "An unexpected error occurred.",
      message:
        data?.message ??
        error.response?.statusText ??
        "Something went wrong while processing your request.",
    };

    return errorResponse;
  }
}
