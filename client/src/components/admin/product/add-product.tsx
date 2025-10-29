"use client";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CustomModal from "@/components/common/modal";
import { ImageUpload } from "@/components/common/upload";
import { CustomButton } from "@/components/common/button";
import {
  FormField,
  TextAreaField,
  TextInputField,
} from "@/components/common/form";
import { createProductAction } from "@/action/product";
import { Response } from "@/types/actions";
import { AddProductFormData } from "@/types/form-schema/product/add-product";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const AddProductBtn = () => {
  const initalState: Response<null> & { inputs: AddProductFormData } = {
    inputs: {
      name: "",
      price: 0,
      images: [],
      quantity: 0,
      description: "",
    },
    error: "",
    message: "",
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [state, action, isPending] = useActionState(
    createProductAction,
    initalState,
  );

  useEffect(() => {
    if ("data" in state) {
      //TODO: Add a toast notification for success
      console.log("Success");
      setIsModalOpen(false);
      setSelectedImages([]);
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Append all selected images to formData
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <CustomModal
      maxWidth="3xl"
      title="Create Product"
      handleSubmit={handleSubmit}
      trigger={
        <CustomButton icon={Plus} onClick={() => setIsModalOpen(true)}>
          Add Product
        </CustomButton>
      }
    >
      <div className="w-full flex flex-col gap-3 my-3">
        {!("data" in state) && state.error && (
          <Alert className="bg-red-100" variant="destructive">
            <AlertDescription>
              {Array.isArray(state.error)
                ? state.error.join(", ")
                : state.error}
            </AlertDescription>
          </Alert>
        )}

        <TextInputField
          id="name"
          name="name"
          required={true}
          label="Product Name"
          placeholder="Enter the product name"
        />
        <TextAreaField
          required={true}
          id="description"
          name="description"
          label="Product Description"
          placeholder="Enter the description of the product"
        />
        <div className="w-full grid grid-cols-2 gap-4">
          <TextInputField
            id="price"
            prefix="₦"
            name="price"
            label="Price"
            type="number"
            required={true}
            className="w-full"
            placeholder="Enter the price of the product"
          />
          <TextInputField
            id="quantity"
            type="number"
            required={true}
            name="quantity"
            label="Quantity"
            className="w-full"
            placeholder="Enter the quantity of the product"
          />
        </div>

        <FormField label="Product Images" htmlFor="images" required={true}>
          <ImageUpload
            selectedImages={selectedImages}
            handleImagesSelect={setSelectedImages}
            accept="image/png, image/jpeg"
            maxFiles={4}
            maxFileSize={3}
          />
        </FormField>
      </div>
    </CustomModal>
  );
};
