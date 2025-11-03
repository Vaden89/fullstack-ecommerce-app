import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "../Spinner";
import { LucideIcon, LucideProps } from "lucide-react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "destructive" | "ghost";
  iconPosition?: "left" | "right";
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export const CustomButton = ({
  children,
  className,
  disabled,
  loading,
  onClick,
  type,
  icon,
  iconPosition = "left",
  variant = "primary",
}: CustomButtonProps) => {
  const stylingBasedOnVariant = {
    primary: "bg-secondary hover:bg-secondary",
    destructive: "bg-destructive hover:bg-destructive",
    ghost: "bg-transparent hover:bg-transparent",
  };

  const styling = cn(
    "hover:opacity-80 flex gap-2",
    stylingBasedOnVariant[variant],
    className,
  );

  const Icon = icon as LucideIcon;

  return (
    <Button
      type={type}
      onClick={onClick}
      className={styling}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Loading</span>
        </>
      ) : (
        <>
          {iconPosition === "left" && Icon && <Icon className="h-4 w-4" />}
          {children}
          {iconPosition === "right" && Icon && <Icon className="h-4 w-4" />}
        </>
      )}
    </Button>
  );
};
