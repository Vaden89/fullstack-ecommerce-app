import Link from "next/link";
import { LoginForm } from "./form";

export default async function LoginPage() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <Link href="/" className="text-4xl font-bold">
        ShopCo
      </Link>
      <LoginForm />
    </div>
  );
}
