"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { CustomButton } from "../common/button";

export const ProductDescription = ({ product }: { product: Product }) => {
  const [selectedSize, setSelectedSize] = useState("large");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [sizeOptions, setSizeOptions] = useState([
    "small",
    "medium",
    "large",
    "x-Large",
  ]);

  return (
    <div className="w-1/2 flex flex-col font-satoshi gap-4">
      <div className="flex flex-col">
        <span className="text-[40px] font-integral font-bold">
          {product.name}
        </span>
        <span className="text-[32px] font-bold ">
          ₦{Number(product.price).toLocaleString()}
        </span>
        <p className="text-[#00000060]">{product.description}</p>
      </div>

      <hr />

      <div className="flex flex-col gap-2">
        <span className="text-[#00000060]">Choose Size</span>
        <div className="flex gap-3">
          {sizeOptions.map((item, index) => {
            return (
              <button
                className="p-2 px-4 rounded-full bg-[#f0f0f0] text-[#00000060]"
                key={index}
              >
                {capitalizeFirstLetter(item)}
              </button>
            );
          })}
        </div>
      </div>

      <hr />

      <div className="w-full flex gap-2">
        <div className="w-1/3 h-14 bg-[#f0f0f0] rounded-full px-5 flex items-center justify-between">
          <button
            disabled={selectedQuantity === 1}
            onClick={() => setSelectedQuantity(selectedQuantity - 1)}
          >
            <Minus size={20} />
          </button>
          <span className="font-medium">{selectedQuantity}</span>
          <button
            disabled={selectedQuantity === product.quantity}
            onClick={() => setSelectedQuantity(selectedQuantity + 1)}
          >
            <Plus />
          </button>
        </div>
        <CustomButton className="w-2/3 h-14 bg-black rounded-full">
          Add to Cart
        </CustomButton>
      </div>
    </div>
  );
};
