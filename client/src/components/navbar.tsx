import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full h-20 flex items-center justify-between p-4 bg-white">
      <div className="flex gap-2 items-center">
        <button aria-label="Open Menu">
          <Menu className="w-[24px] h-[24px]" />
        </button>
        <Link href={"/"}>
          <span className="font-bold text-2xl">SHOP.CO</span>
        </Link>
      </div>
      <div className="flex gap-3 items-center">
        <button aria-label="Search">
          <Search className="w-[24px] h-[24px]" strokeWidth={2.5} />
        </button>
        <button aria-label="View Shopping Cart">
          <ShoppingCart strokeWidth={2.5} className="w-[24px] h-[24px]" />
        </button>
        <button aria-label="View User Profile">
          <CircleUserRound strokeWidth={2.5} className="w-[24px] h-[24px]" />
        </button>
      </div>
    </div>
  );
};
