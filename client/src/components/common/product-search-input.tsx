"use client";
import { getProductAction } from "@/action/product";
import { ArrowUpRight, LayoutTemplate, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { MiniLoader } from "../Loader";

export const ProductSearchInput = () => {
  const [searchField, setSearchField] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { data, isLoading } = useSWR(
    debouncedQuery ? ["/product/search", debouncedQuery] : null,
    ([url, query]) => getProductAction(1, 3, query),
  );

  useEffect(() => {
    if (searchField && searchField.trim()) {
      const timer = setTimeout(() => {
        setDebouncedQuery(searchField);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setDebouncedQuery("");
    }
  }, [searchField]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestionsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const productData = data?.data ?? [];

  return (
    <div
      ref={containerRef}
      className="w-full sm:w-1/2 2xl:w-1/3 h-11 px-4 flex rounded-full items-center gap-2 bg-[#F0F0F0] relative"
    >
      <Search className="w-6 h-6 text-gray-500" strokeWidth={2.5} />
      <input
        className="w-full h-full bg-transparent outline-none"
        type="text"
        placeholder="Search..."
        aria-label="Search for products"
        value={searchField}
        onFocus={() => setSuggestionsOpen(true)}
        onChange={(e) => setSearchField(e.target.value)}
      />
      {searchField && suggestionsOpen && (
        <div className="absolute z-40 left-0 top-full mt-2 sm:mt-1 rounded-xl w-full min-h-40 h-full bg-[#f0f0f0] shadow-md p-4 flex flex-col">
          {isLoading ? (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <MiniLoader />
            </div>
          ) : productData.length > 20 ? (
            productData.map((item) => {
              return (
                <div
                  className="w-full h-10 cursor-pointer hover:bg-gray-100 px-2 flex gap-2 items-center justify-between rounded-md"
                  key={item.id}
                >
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-xs text-gray-400">
                      {item.description}
                    </span>
                  </div>
                  <ArrowUpRight color="gray" />
                </div>
              );
            })
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <LayoutTemplate />
              <span>No results found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
