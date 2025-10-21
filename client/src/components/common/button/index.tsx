import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "../Spinner";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const CustomButton = ({
  children,
  className,
  disabled,
  loading,
  onClick,
  type,
}: CustomButtonProps) => {
  const styling = cn(
    "bg-secondary hover:bg-secondary hover:opacity-80 flex gap-2",
    className
  );

  return (
    <Button
      type={type}
      onClick={onClick}
      className={styling}
      disabled={disabled || loading}
    >
      {loading && <Spinner />}

      {loading ? "loading" : children}
    </Button>
  );
};
