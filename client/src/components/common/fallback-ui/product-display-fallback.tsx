import { cn } from "@/lib/utils";

export const ProductDisplayFallback = () => {
  return (
    <div className="w-full h-full flex flex-col sm:flex-row gap-4">
      <ProductImageSection />
      <ProductInfoSection />
    </div>
  );
};

const ProductImageSection = () => {
  return (
    <div className="w-full sm:w-1/2 flex sm:flex-row flex-col-reverse gap-4">
      <div className="sm:w-1/3 flex sm:flex-col gap-2">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-1/3 sm:w-full h-24 sm:h-1/3 bg-gray-200 rounded-xl animate-pulse",
            )}
          />
        ))}
      </div>
      <div className="w-full sm:w-2/3 h-[500px] bg-gray-200 rounded-xl animate-pulse" />
    </div>
  );
};

const ProductInfoSection = () => {
  return (
    <div className="w-full sm:w-1/2 flex flex-col gap-4">
      <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse" />
      <div className="w-1/3 h-14 bg-gray-200 rounded-xl animate-pulse" />
      <div className="w-full h-1/3 bg-gray-200 rounded-xl animate-pulse" />
    </div>
  );
};
