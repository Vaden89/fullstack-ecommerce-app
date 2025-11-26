import { auth } from "@/app/(auth)/auth";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ProfileButton } from "./profile-btn";
import { ProductSearchInput } from "./common/product-search-input";
import { MobileMenu } from "./common/mobile-menu";

export const Navbar = async () => {
  const session = await auth();

  const isLoggedIn = session?.user !== undefined;

  return (
    <nav className="w-full h-20 flex items-center justify-between p-4 sm:px-14 bg-white gap-5">
      <Link href={"/"} className="hidden sm:flex">
        <span className="font-bold text-2xl sm:text-4xl">SHOP.CO</span>
      </Link>
      <MobileMenu isLoggedIn={isLoggedIn} />
      <DesktopMenu isLoggedIn={isLoggedIn} />
    </nav>
  );
};

const DesktopMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="hidden sm:flex gap-4 w-full justify-end items-center">
      <button>Shop</button>
      <button>On Sale</button>
      <button>New Arrivals</button>
      <button>Brands</button>
      <ProductSearchInput />
      <button aria-label="View Shopping Cart">
        <ShoppingCart strokeWidth={2.5} className="w-6 h-6" />
      </button>
      {isLoggedIn ? (
        <ProfileButton />
      ) : (
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
};
