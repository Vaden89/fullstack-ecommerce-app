import { RegisterForm } from "./form";

export default function RegisterPage() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      <span className="text-4xl font-bold">ShopCo</span>
      <RegisterForm />
    </div>
  );
}
