"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchDonors() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      router.push(`?search=${query}`);
    } else {
      router.push(`?page=1`); // সার্চ খালি করলে মেইন লিস্টে ফিরবে
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-md mx-auto mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ট্রানজেকশন আইডি দিয়ে খুঁজুন..."
        className="w-full p-4 pl-12 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none bg-white shadow-sm"
      />
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500"
        size={20}
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1.5 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all"
      >
        খুঁজুন
      </button>
    </form>
  );
}
