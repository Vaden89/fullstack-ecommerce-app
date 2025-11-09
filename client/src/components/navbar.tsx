import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full h-20 flex items-center justify-between p-4 sm:px-14 bg-white gap-5">
      <div className="flex gap-2 items-center">
        <button className="sm:hidden" aria-label="Open Menu">
          <Menu className="w-6 h-6" />
        </button>
        <Link href={"/"}>
          <span className="font-bold text-2xl sm:text-4xl">SHOP.CO</span>
        </Link>
      </div>
      <MobileMenu />
      <DesktopMenu />
    </div>
  );
};

const MobileMenu = () => {
  return (
    <div className="flex gap-3 items-center sm:hidden">
      <button aria-label="Search">
        <Search className="w-6 h-6" strokeWidth={2.5} />
      </button>
      <button aria-label="View Shopping Cart">
        <ShoppingCart strokeWidth={2.5} className="w-6 h-6" />
      </button>
      <button aria-label="View User Profile">
        <CircleUserRound strokeWidth={2.5} className="w-6 h-6" />
      </button>
    </div>
  );
};

const DesktopMenu = () => {
  return (
    <div className="hidden sm:flex gap-4 w-full justify-end">
      <button>Shop</button>
      <button>On Sale</button>
      <button>New Arrivals</button>
      <button>Brands</button>
      <DesktopSearchComponent />
      <button aria-label="View Shopping Cart">
        <ShoppingCart strokeWidth={2.5} className="w-6 h-6" />
      </button>
      <button aria-label="View User Profile">
        <CircleUserRound strokeWidth={2.5} className="w-6 h-6" />
      </button>
    </div>
  );
};

const DesktopSearchComponent = () => {
  return (
    <div className="w-1/2 2xl:w-1/3 h-11 p-4 flex rounded-full items-center gap-2 bg-[#F0F0F0]">
      <Search className="w-6 h-6 text-gray-500" strokeWidth={2.5} />
      <input
        className="w-full h-full bg-transparent outline-none"
        type="text"
        placeholder="Search..."
        aria-label="Search for products"
      />
    </div>
  );
};
