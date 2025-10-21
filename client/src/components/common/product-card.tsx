import { Product } from "@/types/product";
import Image from "next/image";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="w-[200px] flex flex-col gap-4">
      <div className="w-full h-[200px] bg-[#F0EEED] rounded-lg p-4">
        <Image
          src={product.imageUrls[0]}
          width={100}
          height={100}
          alt={product.name}
        />
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
