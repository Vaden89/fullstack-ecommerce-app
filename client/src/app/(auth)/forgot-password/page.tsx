"use client";
import Link from "next/link";
import { ForgotPasswordForm, ResetPasswordForm } from "./form";
import { useSearchParams } from "next/navigation";

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const intent = searchParams.get("intent");

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <Link href="/" className="text-4xl font-bold">
        ShopCo
      </Link>
      {token && intent === "password-reset" ? (
        <ResetPasswordForm token={token} />
      ) : (
        <ForgotPasswordForm />
      )}
    </div>
  );
}
