"use client";
import { ArrowLeft, ArrowRight, BadgeCheckIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export const TestimonialSection = () => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      const scrollAmount = container.clientWidth;

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full flex flex-col p-5 gap-5">
      <div className="w-full flex justify-between items-end">
        <span className="text-[32px] leading-9 font-bold">
          OUR HAPPY <br className="sm:hidden" /> CUSTOMERS
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous Testimonial"
          >
            <ArrowLeft strokeWidth={3} />
          </button>
          <button onClick={() => scroll("right")} aria-label="Next Testimonial">
            <ArrowRight strokeWidth={3} />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainer}
        className="w-full flex gap-4 overflow-x-auto hide-scroll"
      >
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </div>
    </section>
  );
};

const TestimonialCard = () => {
  const arr = Array.from({ length: 5 });
  return (
    <div className="w-full sm:w-1/4 min-h-[180px] shrink-0 flex flex-col gap-3 p-6 border rounded-xl">
      <div className="flex">
        {arr.map((item, index) => (
          <Image
            key={index}
            src={"/icons/gold-star.svg"}
            width={24}
            height={24}
            alt=""
          />
        ))}
      </div>
      <span className="flex items-center gap-2">
        Sarah M. <BadgeCheckIcon className="text-white" fill="green" />
      </span>
      <p className="text-gray-400 text-sm">
        "I'm blown away by the quality and style of the clothes I received from
        Shop.co. From casual wear to elegant dresses, every piece I've bought
        has exceeded my expectations.”
      </p>
    </div>
  );
};
