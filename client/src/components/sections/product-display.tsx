import { Product } from "@/types/product";
import { getProductByIdAction } from "@/action/product";
import { ProductDescription } from "./product-description";
import { ProductImageDisplay } from "./product-image-display";
import Link from "next/link";
import Image from "next/image";

export async function ProductDisplaySection({
  productId,
}: {
  productId: string;
}) {
  const product = await getProductByIdAction(productId);

  if ("error" in product) {
    const isNotFoundError = product.error.includes("not found");

    return (
      <div className="w-full sm:h-[70vh] bg-muted flex flex-col sm:flex-row ">
        <div className="w-full sm:w-1/2 flex flex-col gap-2 justify-center p-5 sm:px-10">
          <div className="flex flex-col">
            <span className="font-satoshi text-4xl font-bold">
              {isNotFoundError ? "We Looked Everywhere" : "An Error Occurred"}
            </span>
            <span>
              {isNotFoundError
                ? "and didn't see the product you're looking for, maybe go back home and look for something else or check again later"
                : "An error occurred while fetching the product details. Please try again later or contact support."}
            </span>
          </div>
          <Link
            href={"/"}
            className="w-fit bg-black text-white p-2 px-4 rounded-xl"
          >
            Back to Homepage
          </Link>
        </div>
        <Image
          src={
            isNotFoundError
              ? "/images/search-illustration.png"
              : "/images/error-illustration.png"
          }
          width={500}
          height={500}
          alt="Broken search image"
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <span className="text-sm text-[#00000060]">
        Home &gt; Shop &gt; Product Details
      </span>
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <ProductImageDisplay images={product.imageUrls} />
        <ProductDescription product={product} />
      </div>
      <div className="hidden">
        {/*
          The Product review section goes here
        */}
      </div>
    </div>
  );
}
