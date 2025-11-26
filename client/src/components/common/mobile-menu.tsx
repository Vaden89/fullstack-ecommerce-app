"use client";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { ProfileButton } from "../profile-btn";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { ProductSearchInput } from "./product-search-input";

export const MobileMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {!isSearchOpen && (
        <div className="flex sm:hidden gap-2 items-center">
          <button aria-label="Open Menu">
            <Menu className="w-6 h-6" />
          </button>
          <Link href={"/"}>
            <span className="font-bold text-2xl sm:text-4xl">SHOP.CO</span>
          </Link>
        </div>
      )}

      <div className="w-full flex gap-3 items-center justify-end sm:hidden">
        {isSearchOpen && <ProductSearchInput />}

        <button onClick={() => setIsSearchOpen((p) => !p)} aria-label="Search">
          {isSearchOpen ? (
            <div className="p-2 bg-muted rounded-full">
              <X />
            </div>
          ) : (
            <Search className="w-6 h-6" strokeWidth={2.5} />
          )}
        </button>

        {!isSearchOpen && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};
