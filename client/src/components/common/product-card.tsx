import { Product } from "@/types/product";
import { CameraOff } from "lucide-react";
import Image from "next/image";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="w-[200px] flex flex-col gap-4">
      <div className="relative w-full h-[200px] border rounded-lg">
        {product.imageUrls[0] ? (
          <Image
            alt={product.name}
            fill
            src={product.imageUrls[0]}
            className="object-contain aspect-square"
          />
        ) : (
          <CameraOff className="w-[100px] aspect-square" />
        )}
      </div>
      <div className="w-full text-left flex flex-col">
        <span className="text-2xl font-bold truncate">{product.name}</span>
        <span className="text-lg">
          ₦{" "}
          {product.price.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  );
};
