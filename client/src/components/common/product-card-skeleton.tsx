export const ProductCardSkeleton = () => {
  return (
    <div className="sm:w-full flex flex-col gap-4 animate-pulse shrink-0">
      <div className="w-full aspect-square bg-gray-200 rounded-lg" />
      <div className="w-full flex flex-col gap-2">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
};
