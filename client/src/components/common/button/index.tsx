import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "../Spinner";
import { LucideIcon, LucideProps } from "lucide-react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  iconPosition?: "left" | "right";
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
}: CustomButtonProps) => {
  const styling = cn(
    "bg-secondary hover:bg-secondary hover:opacity-80 flex gap-2",
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
          <span className="sr-only">Loading</span>
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
