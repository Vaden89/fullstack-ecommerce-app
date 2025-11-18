import { auth } from "@/app/(auth)/auth";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ProfileButton } from "./profile-btn";
import { DesktopSearchComponent } from "./common/product-search-input";

export const Navbar = async () => {
  const session = await auth();

  const isLoggedIn = session?.user !== undefined;

  return (
    <nav className="w-full h-20 flex items-center justify-between p-4 sm:px-14 bg-white gap-5">
      <div className="flex gap-2 items-center">
        <button className="sm:hidden" aria-label="Open Menu">
          <Menu className="w-6 h-6" />
        </button>
        <Link href={"/"}>
          <span className="font-bold text-2xl sm:text-4xl">SHOP.CO</span>
        </Link>
      </div>
      <MobileMenu isLoggedIn={isLoggedIn} />
      <DesktopMenu isLoggedIn={isLoggedIn} />
    </nav>
  );
};

const MobileMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="flex gap-3 items-center sm:hidden">
      <button aria-label="Search">
        <Search className="w-6 h-6" strokeWidth={2.5} />
      </button>

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

const DesktopMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="hidden sm:flex gap-4 w-full justify-end items-center">
      <button>Shop</button>
      <button>On Sale</button>
      <button>New Arrivals</button>
      <button>Brands</button>
      <DesktopSearchComponent />
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
