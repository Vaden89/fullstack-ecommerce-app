import { ProductDisplayFallback } from "@/components/common/fallback-ui/product-display-fallback";
import { ProductDisplaySection } from "@/components/sections/product-display";
import { TopSellingSection } from "@/components/sections/top-selling";
import { Suspense } from "react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full min-h-dvh my-4 flex flex-col">
      <Suspense fallback={<ProductDisplayFallback />}>
        <ProductDisplaySection productId={id} />
      </Suspense>
      <TopSellingSection />
    </div>
  );
}
