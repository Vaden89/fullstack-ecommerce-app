import CustomModal from "@/components/common/modal";
import { Product } from "@/types/product";

interface EditProductProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const EditProduct = ({ isOpen, onClose }: EditProductProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <CustomModal
      maxWidth="3xl"
      isOpen={isOpen}
      title="Edit Product"
      onOpenChange={onClose}
      handleSubmit={handleSubmit}
      subTitle="Replace the information you want to change about the product"
    >
      <>
        {/*
          TODO: Implement form fields for editing product information
          */}
      </>
    </CustomModal>
  );
};
