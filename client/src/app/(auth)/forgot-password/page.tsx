"use client";
import { ForgotPasswordForm } from "./form";
import { useSearchParams } from "next/navigation";

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const intent = searchParams.get("intent");

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <span className="text-4xl font-bold">ShopCo</span>
      {token && intent === "reset-password" ? (
        <div>
          {/* Reset Password Form Component can be placed here */}
          <span>Reset Password Form Placeholder</span>
        </div>
      ) : (
        <ForgotPasswordForm />
      )}
    </div>
  );
}
