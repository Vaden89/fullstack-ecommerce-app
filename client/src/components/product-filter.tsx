"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { PriceRangeSlider } from "./common/price-range-slider";
import { useState } from "react";

export const ProductFilter = () => {
  const [open, setOpen] = useState(false);

  // Add animations to this page

  const categories = ["Formal", "Casual", "Party", "Sport"];

  const tags = [
    "Knitwear",
    "Shirts",
    "Trousers",
    "Jackets",
    "Accessories",
    "Women",
    "Men",
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-8 h-8 bg-muted rounded-full flex items-center justify-center"
      >
        <Image
          src="/icons/filter-black.svg"
          alt="filter-icon"
          width={18}
          height={18}
        />
      </button>
      {open && (
        <div className="w-full h-dvh absolute inset-0 bg-[#00000040] z-20 flex flex-col justify-end">
          <div className="w-full bg-white h-4/5 rounded-t-4xl p-8 flex flex-col justify-between">
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex items-center justify-between">
                <span className="text-xl font-bold">Filters</span>
                <button onClick={() => setOpen(false)}>
                  <X className="text-gray-600" />
                </button>
              </div>
              <hr />
              <div className="w-full">
                <span className="text-lg font-semibold">Tags</span>
                <div className="w-full grid grid-cols-2 gap-4 mt-2">
                  {tags.map((tag) => (
                    <div key={tag}>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr />

              <div className="w-full">
                <span className="text-lg font-semibold">Price</span>
                <PriceRangeSlider />
              </div>

              <hr className="mt-5" />

              <div className="w-full">
                <span className="text-lg font-semibold">Categories</span>
                <div className="w-full grid grid-cols-2 gap-4 mt-2">
                  {categories.map((category) => (
                    <div key={category}>
                      <span>{category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full rounded-full">
              Apply Filter
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
