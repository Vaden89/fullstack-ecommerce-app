import { ProductDisplaySection } from "@/components/sections/product-display";
import { Suspense } from "react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full min-h-dvh my-4">
      <Suspense>
        <ProductDisplaySection productId={id} />
      </Suspense>
    </div>
  );
}
