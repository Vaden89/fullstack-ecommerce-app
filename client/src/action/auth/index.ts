"use server";

import { auth, signIn } from "@/app/(auth)/auth";
import { axiosPost } from "@/lib/api";
import { collectErrorMessages } from "@/lib/utils";
import { ErrorResponse, SuccessResponse } from "@/types/actions";
import { LoginFormData, loginFormSchema } from "@/types/form-schema/auth/login";
import {
  registerFormData,
  RegisterFormData,
} from "@/types/form-schema/auth/register";
import { UserInterface } from "@/types/user";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import z from "zod";

export const loginUserAction = async (_: any, formData: FormData) => {
  const session = await auth();
  let rawData: LoginFormData | null = null;

  try {
    rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validatedData = loginFormSchema.safeParse(rawData);

    if (!validatedData.success) {
      const messages = collectErrorMessages(
        z.treeifyError(validatedData.error)
      );

      return {
        inputs: rawData,
        message: "",
        error: messages,
      } as ErrorResponse & { inputs: LoginFormData };
    }

    const { email, password } = validatedData.data;

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/",
    });

    if (!session?.user) throw new Error("Something went wrong");

    return {
      data: session?.user,
      message: "Login Successful",
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return {
      inputs: rawData,
      message: "Something went wrong",
      error:
        error instanceof Error &&
        error.cause &&
        typeof error.cause === "object" &&
        "err" in error.cause
          ? (error.cause.err as { message?: string }).message
          : "Something went wrong",
    } as ErrorResponse & { inputs: LoginFormData };
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await axiosPost<
    SuccessResponse<{ user: UserInterface; token: string }>
  >("/auth/login", {
    email,
    password,
  });

  if (!("data" in response)) {
    return response as ErrorResponse;
  }

  return response;
};

export const registerUserAction = async (_: any, formData: FormData) => {
  let rawData: RegisterFormData | null = null;

  try {
    rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
    };

    const validatedData = registerFormData.safeParse(rawData);

    if (!validatedData.success) {
      const messages = collectErrorMessages(
        z.treeifyError(validatedData.error)
      );

      return {
        inputs: rawData,
        message: "Invalid Data Passed!",
        error: messages,
      } as ErrorResponse;
    }

    const response = await registerUser(validatedData.data);

    if (!("data" in response)) throw new Error("Something went wrong");

    return response;
  } catch (error) {
    return {
      inputs: rawData,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Something went wrong",
    } as ErrorResponse & { inputs: RegisterFormData };
  }
};

const registerUser = async (payload: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}) => {
  const response = await axiosPost<SuccessResponse<{ user: UserInterface }>>(
    "/auth/register",
    payload
  );

  if (!("data" in response)) {
    return response as ErrorResponse;
  }

  return response;
};
