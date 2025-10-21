"use client";
import { loginUserAction } from "@/action/auth";
import { TextInputField } from "@/components/common/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Response } from "@/types/actions";
import { LoginFormData } from "@/types/form-schema/auth/login";
import { UserInterface } from "@/types/user";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const initialState: Response<UserInterface> & { inputs: LoginFormData } = {
  inputs: {
    email: "",
    password: "",
  },
  error: "",
  message: "",
};

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null);

  const [state, action, isPending] = useActionState(
    loginUserAction,
    initialState,
  );

  useEffect(() => {
    const message = searchParams.get("message");

    if (message) {
      setRedirectMessage(message);
      const newUrl = window.location.pathname;

      router.replace(newUrl);
    }
  }, [searchParams]);

  const handleFormSubmit = () => {
    setRedirectMessage(null);
  };

  return (
    <div className="w-1/3 p-5 rounded-lg flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="text-lg font-bold">Login</span>
        <span className="text-sm text-gray-500">
          Welcome back! - Please sign in to continue
        </span>
      </div>

      {redirectMessage && (
        <Alert variant="default">
          <AlertDescription>{redirectMessage}</AlertDescription>
        </Alert>
      )}

      <form
        action={action}
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4"
      >
        <TextInputField
          id="email"
          name="email"
          label="Email"
          required={true}
          placeholder="name@example.com"
        />
        <TextInputField
          id="password"
          type="password"
          label="Password"
          name="password"
          placeholder="••••••••"
          required={true}
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
        <Button
          className="bg-secondary hover:bg-secondary hover:opacity-80"
          type="submit"
        >
          Login
        </Button>
      </form>
      <div className="w-full flex flex-col text-sm gap-1 items-center">
        <span>
          Don&apos;t have an account?{" "}
          <Link className="font-medium text-secondary" href={"/register"}>
            Register here
          </Link>
        </span>
        <Link className="font-medium text-secondary" href="/forgot-password">
          Reset Password
        </Link>
      </div>
    </div>
  );
};
