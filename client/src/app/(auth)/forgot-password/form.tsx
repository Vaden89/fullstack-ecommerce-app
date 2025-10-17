"use client";
import { reqPasswordResetAction } from "@/action/auth";
import { CustomButton } from "@/components/common/button";
import { TextInputField } from "@/components/common/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useActionState } from "react";

export const ForgotPasswordForm = () => {
  const initialState = {
    inputs: {
      email: "",
    },
    message: "",
    error: "",
  };

  const [state, action, isPending] = useActionState(
    reqPasswordResetAction,
    initialState
  );

  return (
    <form action={action} className="w-1/3 p-5 flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">Request password reset</span>
        <p className="text-sm text-gray-400">
          Enter your email and a password reset link will be sent to your email
          address
        </p>
      </div>
      <TextInputField
        id="email"
        label="Email Address"
        name="email"
        placeholder="name@example.com"
      />
      {"data" in state && (
        <Alert variant="default">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      {"error" in state && state.error && (
        <Alert variant="destructive">
          <AlertDescription>
            {Array.isArray(state.error) ? state.error.join(", ") : state.error}
          </AlertDescription>
        </Alert>
      )}
      <CustomButton
        type="submit"
        loading={isPending}
        className="w-full font-semibold"
      >
        Submit
      </CustomButton>

      <div className="w-full text-center">
        <span>
          Remember your password again?{" "}
          <Link className="text-secondary font-medium" href="/login">
            Login
          </Link>
        </span>
      </div>
    </form>
  );
};
