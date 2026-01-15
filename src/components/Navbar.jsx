"use client";

import { Heart, User } from "lucide-react";
import { signOut } from "next-auth/react"; // Use client-side signOut
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ user }) => {
  const path = usePathname();
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link
            href={path.includes("admin") ? "/admin" : "/"}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Heart className="text-green-500 fill-green-500" size={28} />
            <span className="text-xl font-bold text-slate-800">
              ক্যান্সার জয়ী
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-green-500 transition"
            >
              মূল পাতা
            </Link>
            <Link
              href="/donors"
              className="text-slate-600 hover:text-green-500 transition"
            >
              দাতাদের তালিকা
            </Link>

            {/* AUTH CONDITION */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="flex items-center space-x-1 text-slate-600 hover:text-green-500 transition"
                >
                  <User size={18} />
                  <span>{user.email.split("@")[0]}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-red-500 hover:text-red-600 transition text-sm font-medium"
                >
                  লগ আউট
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-slate-600 hover:text-green-500 transition"
              >
                লগইন
              </Link>
            )}

            <Link
              href="/donate"
              className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition shadow-lg shadow-green-200"
            >
              এখনই দান করুন
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <Link
              href={"/donate"}
              className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold"
            >
              দান করুন
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
