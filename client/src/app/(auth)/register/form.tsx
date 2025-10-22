"use client";
import { registerUserAction } from "@/action/auth";
import { CustomButton } from "@/components/common/button";
import { TextInputField } from "@/components/common/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Response } from "@/types/actions";
import { RegisterFormData } from "@/types/form-schema/auth/register";
import { UserInterface } from "@/types/user";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

export const RegisterForm = () => {
  const initialState: Response<UserInterface> & { inputs: RegisterFormData } = {
    inputs: {
      email: "",
      lastname: "",
      password: "",
      firstname: "",
    },
    error: "",
    message: "",
  };

  const [state, action, isPending] = useActionState(
    registerUserAction,
    initialState,
  );

  return (
    <div className="w-full sm:w-1/3 p-5 flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="text-lg font-bold">Create an account</span>
        <span className="text-sm text-gray-500">
          Enter your details to create a new account
        </span>
      </div>
      <form action={action} className="flex flex-col gap-4">
        <TextInputField
          id="firstname"
          name="firstname"
          label="Firstname"
          placeholder="Jane"
          required={true}
          type="text"
        />
        <TextInputField
          id="lastname"
          name="lastname"
          label="Lastname"
          placeholder="Doe"
          required={true}
          type="text"
        />
        <TextInputField
          id="email"
          name="email"
          label="Email address"
          placeholder="name@example.com"
          required={true}
          type="text"
        />
        <TextInputField
          id="password"
          name="password"
          label="Password"
          placeholder="••••••••"
          required={true}
          type="password"
        />
        {"error" in state && state.error && (
          <Alert variant="destructive">
            <AlertDescription>
              {Array.isArray(state.error)
                ? state.error.join(", ")
                : state.error}
            </AlertDescription>
          </Alert>
        )}

        {"data" in state && state.data && (
          <Alert variant="default" className="text-green-600 border-green-600">
            <CheckCircle2 className="w-4 h-4" />
            <AlertDescription className="text-green-600">
              Account registered successfully, go login
            </AlertDescription>
          </Alert>
        )}

        <CustomButton loading={isPending}>Register</CustomButton>
      </form>

      <div className="w-full flex flex-col text-sm gap-1 items-center">
        <span>
          Already have an account?{" "}
          <Link className="text-secondary font-medium" href={"/login"}>
            Login here
          </Link>
        </span>
        <Link className="text-secondary font-medium" href={"/forgot-password"}>
          Reset Password
        </Link>
      </div>
    </div>
  );
};
