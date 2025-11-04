import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomButton } from "../button";

interface CustomModalProps {
  title?: string;
  isOpen?: boolean;
  subTitle?: string;
  loading?: boolean;
  onClose?: () => void;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  onOpenChange?: (val: boolean) => void;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  confirmBtnText?: string;
  confirmBtnVariant?: "primary" | "destructive";
}

export default function CustomModal({
  isOpen,
  onClose,
  children,
  trigger,
  title,
  subTitle,
  handleSubmit,
  onOpenChange,
  maxWidth = "lg",
  loading = false,
  confirmBtnText = "Confirm",
  confirmBtnVariant = "primary",
}: CustomModalProps) {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm":
        return "sm:max-w-sm";
      case "md":
        return "sm:max-w-md";
      case "lg":
        return "sm:max-w-lg";
      case "xl":
        return "sm:max-w-xl";
      case "2xl":
        return "sm:max-w-2xl";
      case "3xl":
        return "sm:max-w-3xl";
      default:
        return "sm:max-w-lg";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={` ${getMaxWidthClass()}`}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {subTitle && <DialogDescription>{subTitle}</DialogDescription>}
          </DialogHeader>
          <div>{children}</div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <CustomButton
              type="submit"
              loading={loading}
              variant={confirmBtnVariant}
            >
              {confirmBtnText}
            </CustomButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
