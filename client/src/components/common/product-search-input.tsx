"use client";
import { getProductAction } from "@/action/product";
import { LayoutTemplate, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { MiniLoader } from "../Loader";

export const DesktopSearchComponent = () => {
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

  console.log(productData);

  // When you click on the search field and start typing I want a modal to be displayed with search results.
  // But when you click outside the search field, I want the modal to close.
  // When you type a search query, I want to make an API call with the search results

  return (
    <div
      ref={containerRef}
      className="w-1/2 2xl:w-1/3 h-11 px-4 flex rounded-full items-center gap-2 bg-[#F0F0F0] relative"
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
      {debouncedQuery && suggestionsOpen && (
        <div className="absolute z-40 left-0 top-full mt-1 rounded-xl w-full min-h-40 bg-white shadow-md p-4 flex flex-col items-center justify-center">
          {isLoading ? (
            <MiniLoader />
          ) : productData.length > 0 ? (
            productData.map((item) => {
              return <div key={item.id}>Hello</div>;
            })
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <LayoutTemplate />
              <span>No results found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
