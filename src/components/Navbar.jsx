"use client";

import { Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AdminDropdown from "./AdminDropdown";

const Navbar = ({ user = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const path = usePathname();
  let userRole = null;

  if (user && user.role) {
    userRole = user.role;
  }

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 lg:py-4 lg:pt-6 flex items-center justify-between">
          {/* Left Section: Mobile Menu Button + Logo */}
          <div className="flex items-center gap-2 lg:gap-8">
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleNavbar}
              className="lg:hidden focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link
              href={path.includes("admin") ? "/admin" : "/"}
              className="flex items-center gap-2"
            >
              <Image
                src="/logos.png"
                alt="Logo"
                width={130}
                height={20}
                // className="w-10 h-10"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex lg:items-center lg:gap-8 lg:grow lg:justify-end">
            <Link
              href="/"
              className="text-slate-600 hover:text-green-500 transition-colors duration-200"
            >
              মূল পাতা
            </Link>

            {/* a route for victim details */}
            <Link
              href="/victim/sharif"
              className="text-slate-600 hover:text-green-500 transition-colors duration-200"
            >
              ওমর শরীফের কথা
            </Link>
            <Link
              href="/donors"
              className="text-slate-600 hover:text-green-500 transition-colors duration-200"
            >
              দাতাদের তালিকা
            </Link>

            <div className="flex items-center gap-4">
              {/* Donate Button */}
              <Link
                href="/donate"
                className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-all duration-200 shadow-lg shadow-green-200/50"
              >
                এখনই দান করুন
              </Link>
              {/* Auth Links */}
              {user && <AdminDropdown user={user} signOut={signOut} />}
            </div>
          </nav>

          {/* Mobile Donate Button (visible when menu is closed) */}
          <div className="lg:hidden">
            <Link
              href="/donate"
              className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-all duration-200"
            >
              দান করুন
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div
            ref={menuRef}
            className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white shadow-xl rounded-lg py-4 px-6 z-30 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <Link
                href="/"
                className="text-slate-600 hover:text-green-500 transition-colors duration-200 text-lg"
                onClick={() => setIsOpen(false)}
              >
                মূল পাতা
              </Link>
              <Link
                href="/victim/sharif"
                className="text-slate-600 hover:text-green-500 transition-colors duration-200 text-lg"
              >
                ওমর শরীফের কথা
              </Link>
              <Link
                href="/donors"
                className="text-slate-600 hover:text-green-500 transition-colors duration-200 text-lg"
                onClick={() => setIsOpen(false)}
              >
                দাতাদের তালিকা
              </Link>
              <Link
                href="/donate"
                className="bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-all duration-200 shadow-lg shadow-green-200/50"
              >
                এখনই দান করুন
              </Link>

              {user && <AdminDropdown user={user} signOut={signOut} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
