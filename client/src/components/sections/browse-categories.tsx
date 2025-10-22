import Image from "next/image";

export const BrowseCategoriesSection = () => {
  return (
    <div className="w-full h-full p-5 flex flex-col gap-4 items-center bg-[#F0F0F0] rounded-2xl">
      <span className="font-bold text-[32px] my-4">
        BROWSE BY <br /> DRESS STYLE
      </span>
      <CategoryCard title="Casual" image="casual.png" />
      <CategoryCard title="Formal" image="formal.png" />
      <CategoryCard title="Party" image="casual.png" />
    </div>
  );
};

const CategoryCard = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="w-full h-[190px] bg-white relative p-3 rounded-2xl">
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
