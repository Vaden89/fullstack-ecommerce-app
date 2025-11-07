import Image from "next/image";

export const BrowseCategoriesSection = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="w-full sm:w-4/5 h-full p-5 flex flex-col gap-4 items-center bg-[#F0F0F0] rounded-2xl sm:gap-2">
        <span className="font-bold text-[32px] my-4">
          BROWSE BY <br className="sm:hidden" /> DRESS STYLE
        </span>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CategoryCard title="Formal" image="formal.png" />
          <CategoryCard
            title="Casual"
            image="casual.png"
            className="col-span-2"
          />
          <CategoryCard
            title="Party"
            image="formal.png"
            className="col-span-2"
          />
          <CategoryCard title="Party" image="casual.png" />
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({
  title,
  image,
  className,
}: {
  title: string;
  image: string;
  className?: string;
}) => {
  return (
    <div
      className={`w-full h-[190px] bg-white relative p-3 rounded-2xl ${className}`}
    >
      <span className="font-bold text-2xl z-10 relative">{title}</span>
      <Image
        src={`/images/${image}`}
        alt={`${title} category`}
        fill
        className="object-cover object-center absolute top-0 -right-3 rounded-2xl"
      />
    </div>
  );
};
