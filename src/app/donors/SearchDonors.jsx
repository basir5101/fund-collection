"use client";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";

export default function SearchDonors() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("?page=1");
    }
  };

  const handleClear = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    router.push("?page=1");
  };

  const showClear = query.length > 0;

  return (
    <form onSubmit={handleSearch} className="relative max-w-md mx-auto mb-8">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ট্রানজেকশন আইডি দিয়ে খুঁজুন..."
          className="w-full p-4 pl-12 pr-24 rounded-2xl border border-emerald-100 
                     focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 
                     outline-none bg-white shadow-sm transition-all"
        />

        {/* Search Icon */}
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"
          size={20}
        />

        {/* Clear button - only visible when there's text */}
        {showClear && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 top-1/2 -translate-y-1/2 
                       text-gray-400 hover:text-gray-700 
                       focus:outline-none focus:text-emerald-600
                       transition-colors p-1 rounded-full hover:bg-gray-100"
            title="সার্চ ক্লিয়ার করুন"
          >
            <X size={18} />
          </button>
        )}

        {/* Search Submit Button */}
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 
                     bg-emerald-500 text-white px-4 py-1.5 
                     rounded-xl text-sm font-bold 
                     hover:bg-emerald-600 active:bg-emerald-700 
                     transition-all shadow-sm"
        >
          খুঁজুন
        </button>
      </div>
    </form>
  );
}
