import { CustomButton } from "@/components/common/button";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="w-full h-dvh flex justify-center items-center">
      <h1>Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Link href="/login">
        <CustomButton>Login</CustomButton>
      </Link>
    </main>
  );
}
