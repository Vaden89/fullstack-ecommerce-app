import { Product } from "@/types/product";
import { CameraOff } from "lucide-react";
import Image from "next/image";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="w-[200px] flex flex-col gap-4">
      <div className="w-full h-[200px] bg-[#F0EEED] rounded-lg p-4">
        {product.imageUrls[0] ? (
          <Image
            src={product.imageUrls[0]}
            fill
            alt={product.name}
            className="object-contain p-4"
          />
        ) : (
          <CameraOff className="w-[100px] aspect-square" />
        )}
      </div>
      <div className="w-full flex flex-col">
        <span>{product.name}</span>
        <span>
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "NGN",
          })}
        </span>
      </div>
    </div>
  );
};
