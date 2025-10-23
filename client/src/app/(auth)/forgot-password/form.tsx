"use client";
import { forgotPasswordAction, reqPasswordResetAction } from "@/action/auth";
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
    initialState,
  );

  return (
    <form action={action} className="w-full sm:w-1/3 p-5 flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">Request password reset</span>
        <p className="text-sm text-gray-400">
          Enter your email and a password reset link will be sent to your email
          address
        </p>
      </div>
      <TextInputField
        id="email"
        name="email"
        className="w-full"
        label="Email Address"
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

export const ResetPasswordForm = ({ token }: { token: string | null }) => {
  const initialState = {
    inputs: {
      password: "",
      confirm_password: "",
    },
    error: "",
    message: "",
  };

  const [state, action, isPending] = useActionState(
    forgotPasswordAction,
    initialState,
  );

  return (
    <form className="w-full sm:w-1/3 flex flex-col gap-4 p-5" action={action}>
      <div className="flex flex-col">
        <span>Reset Password</span>
        <p className="text-sm text-gray-500">Enter your new password details</p>
      </div>

      <TextInputField
        id="password"
        type="password"
        name="password"
        label="New Password"
        placeholder="Enter new password"
      />

      <TextInputField
        id="confirm_password"
        type="password"
        name="confirm_password"
        label="Confirm Password"
        placeholder="Confirm new password"
      />

      {"error" in state && state.error && (
        <Alert variant="destructive">
          <AlertDescription>
            {Array.isArray(state.error) ? state.error.join(", ") : state.error}
          </AlertDescription>
        </Alert>
      )}

      <CustomButton loading={isPending} type="submit" className="w-full">
        Submit
      </CustomButton>
    </form>
  );
};
