import { deleteProductAction } from "@/action/product";
import CustomModal from "@/components/common/modal";
import { Product } from "@/types/product";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

interface DeleteProductProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const DeleteProduct = ({
  isOpen,
  onClose,
  product,
}: DeleteProductProps) => {
  const initialState: any = {
    inputs: {
      id: product.id,
    },
    error: "",
    message: "",
  };

  const [state, action, isPending] = useActionState(
    deleteProductAction,
    initialState,
  );

  useEffect(() => {
    if (!("data" in state) && state.error) {
      toast.error(state.error);
    }

    if ("data" in state) {
      toast.success("Product successfully deleted");
      onClose();
      mutate((key) => Array.isArray(key) && key[0] === "/products");
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", product.id);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <CustomModal
      maxWidth="lg"
      isOpen={isOpen}
      onClose={onClose}
      loading={isPending}
      onOpenChange={onClose}
      confirmBtnText="Delete"
      handleSubmit={handleSubmit}
      confirmBtnVariant="destructive"
    >
      <div className="w-full flex flex-col items-center text-center gap-4">
        <div className="w-14 aspect-square flex justify-center items-center bg-red-100 rounded-full text-red-500">
          <Trash2 className="w-6 h-6 " />
        </div>
        <span className="text-2xl font-bold">
          Are you sure you want to delete this <br /> product?
        </span>
        <span className="text-sm text-gray-400">
          You are about to permanetly delete the following product. THis action
          is irreversible and cannot be undone.
        </span>
        <div className="w-full h-28 p-4 flex items-center gap-4">
          {product.imageUrls[0] && (
            <Image
              src={product.imageUrls[0]}
              width={75}
              height={75}
              alt=""
              className="h-full w-24 aspect-square border rounded-md"
            />
          )}

          <div className="text-left flex flex-col">
            <span>{product.name}</span>
            <span className="text-sm text-gray-500">{product.id}</span>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
