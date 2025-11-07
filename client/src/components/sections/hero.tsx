import Image from "next/image";
import { DiscountBanner } from "../discount-banner";
import { Navbar } from "../navbar";
import { Button } from "../ui/button";

export const HeroSection = () => {
  return (
    <div className="w-full h-full min-h-dvh bg-[#F2F0F1]">
      <DiscountBanner />
      <Navbar />
      <div className="flex flex-col sm:flex-row w-full h-dvh items-center">
        <div className="w-full flex flex-col gap-2 sm:gap-4 px-4 sm:mx-10 py-6">
          <span className="text-4xl sm:text-[64px] sm:leading-[64px] font-bold">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </span>
          <p className="text-sm text-[#00000060]">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Button className="xl:w-[210px] h-[52px] text-base font-medium rounded-full">
            Shop Now
          </Button>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 mt-5 gap-4">
            <div className="flex flex-col text-center sm:text-left relative gap-2">
              <span className="text-2xl sm:text-[40px] font-bold leading-[100%]">
                200 +
              </span>
              <span className="text-xs sm:text-sm text-gray-400">
                International Brands
              </span>
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-px h-14 bg-gray-300" />
            </div>
            <div className="flex flex-col text-center relative gap-2">
              <span className="text-2xl sm:text-[40px] font-bold leading-[100%]">
                2,000 +
              </span>
              <span className="text-xs sm:text-sm text-gray-400">
                High Quality Products
              </span>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gray-300 hidden sm:flex" />
            </div>
            <div className="flex flex-col col-span-2 sm:col-span-1 items-center sm:items-start gap-2 ">
              <span className="text-2xl sm:text-[40px] font-bold leading-[100%]">
                30,000 +
              </span>
              <span className="text-xs sm:text-sm text-gray-400">
                Happy customers
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-[50vh] sm:h-full relative">
          <Image
            src="/images/landing-img.jpg"
            alt="Landing background"
            fill
            className="object-cover object-top "
            priority
          />
          <Image
            src="/icons/black-star.svg"
            width={100}
            height={100}
            alt=""
            className="w-[44px] h-[44px] absolute left-5 top-1/2 "
          />
          <Image
            src="/icons/black-star.svg"
            width={100}
            height={100}
            alt=""
            className="w-[76px] h-[76px] absolute top-1/5 right-5"
          />
        </div>
      </div>
    </div>
  );
};
