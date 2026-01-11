"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

const Navbar = ({ onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Heart className="text-rose-500 fill-rose-500" size={28} />
            <span className="text-xl font-bold text-slate-800">
              ক্যান্সার জয়ী
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-rose-500 transition"
            >
              মূল পাতা
            </Link>
            <Link
              href="/donors"
              className="text-slate-600 hover:text-rose-500 transition"
            >
              দাতাদের তালিকা
            </Link>
            <Link
              href="/donate"
              className="bg-rose-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-rose-600 transition shadow-lg shadow-rose-200"
            >
              এখনই দান করুন
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => onNavigate("donate")}
              className="bg-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold"
            >
              দান করুন
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
