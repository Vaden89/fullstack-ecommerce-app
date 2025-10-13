import { LoginForm } from "./form";

export default async function LoginPage() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <span className="text-4xl font-bold">ShopCo</span>
      <LoginForm />
    </div>
  );
}
