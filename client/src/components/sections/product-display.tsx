import { getProductByIdAction } from "@/action/product";
import { ProductImageDisplay } from "./product-image-display";
import { Product } from "@/types/product";
import { ProductDescription } from "./product-description";
import { TopSellingSection } from "./top-selling";

export async function ProductDisplaySection({
  productId,
}: {
  productId: string;
}) {
  const product = await getProductByIdAction(productId);

  if ("error" in product) {
    //Display fallback ui
    return null;
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
      <TopSellingSection />
    </div>
  );
}
