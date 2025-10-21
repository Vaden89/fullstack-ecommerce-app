"use client";
import { ForgotPasswordForm, ResetPasswordForm } from "./form";
import { useSearchParams } from "next/navigation";

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const intent = searchParams.get("intent");

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <span className="text-4xl font-bold">ShopCo</span>
      {token && intent === "reset-password" ? (
        <ResetPasswordForm token={token} />
      ) : (
        <ForgotPasswordForm />
      )}
    </div>
  );
}
