import { cn } from "@/lib/utils";
import { LucideIcon, LucideProps } from "lucide-react";

interface TextInputFieldProps {
  id: string;
  name: string;
  type?: string;
  readonly?: boolean;
  className?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  label: string | React.ReactNode;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  iconPosition?: "right" | "left";
}

export const TextInputField = ({
  id,
  label,
  name,
  className = "",
  defaultValue,
  placeholder,
  required = false,
  readonly = false,
  type,
  icon,
  iconPosition,
}: TextInputFieldProps) => {
  const styling = cn(
    "form-input px-4 bg-input h-10 rounded-md px-4 text-foreground placeholder:text-muted-foreground w-full",
    `${iconPosition === "left" ? "pl-10" : iconPosition === "right" ? "pr-10" : ""}`,
    className,
  );
  const Icon = icon as LucideIcon;

  return (
    <FormField htmlFor={id} label={label} required={required}>
      <div className="w-full relative">
        {icon && iconPosition === "left" && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-5 h-5 text-gray-500" />
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          disabled={readonly}
          className={styling}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        {icon && iconPosition === "right" && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Icon className="w-5 h-5 text-gray-500" />
          </span>
        )}
      </div>
    </FormField>
  );
};

interface FormFieldProps {
  required?: boolean;
  children: React.ReactNode;
  htmlFor: string;
  label: string | React.ReactNode;
}

export const FormField = ({
  label,
  children,
  required,
  htmlFor,
}: FormFieldProps) => {
  return (
    <div className={`flex flex-col`}>
      {typeof label === "string" ? (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-muted-foreground mb-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      ) : (
        <div className="text-sm font-medium text-muted-foreground mb-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </div>
      )}
      {children}
    </div>
  );
};
