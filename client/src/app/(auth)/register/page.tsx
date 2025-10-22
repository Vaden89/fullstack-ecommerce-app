import Link from "next/link";
import { RegisterForm } from "./form";

export default function RegisterPage() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <Link href="/" className="text-4xl font-bold">
        ShopCo
      </Link>
      <RegisterForm />
    </div>
  );
}
