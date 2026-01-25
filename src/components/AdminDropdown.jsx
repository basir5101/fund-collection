import {
  Calendar,
  ChevronDown,
  HandCoins,
  LayoutDashboard,
  LayoutGrid,
  LogOutIcon,
  User2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const AdminDropdown = ({ user, signOut, openNaver }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleToggle() {
    setIsOpen(!isOpen);
    openNaver(false);
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-1 text-slate-600 hover:text-green-500 transition-colors duration-200 font-medium"
      >
        <span className="bg-purple-600 h-8 w-8 font-bold text-white p-2 flex items-center justify-center rounded-full capitalize">
          {/* <User size={18} /> */}
          {user ? user.email[0] : "A"}
        </span>
        <span>{user ? user.email.split("@")[0] : "Admin"}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute lg:-right-3 left-10 top-7 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-green-200 ring-opacity-5 z-50">
          <div className="py-">
            {user ? (
              <>
                {/* Logged In Links */}
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleToggle}
                >
                  <User2 size={16} /> Profile
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleToggle}
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>

                {user?.role === "admin" && (
                  <Link
                    href="/users"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleToggle}
                  >
                    <Users size={16} /> Users
                  </Link>
                )}
                <Link
                  href="/admin/gallery"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleToggle}
                >
                  <LayoutGrid size={16} /> Gallery
                </Link>
                <Link
                  href="/admin/donors"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleToggle}
                >
                  <HandCoins size={16} /> Donors
                </Link>
                <Link
                  href="/admin/event"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleToggle}
                >
                  <Calendar size={16} /> Event
                </Link>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  <LogOutIcon size={16} /> Logout
                </button>
              </>
            ) : (
              /* Logged Out Link */
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-gray-100 font-medium"
                onClick={handleToggle}
              >
                <LogOutIcon size={16} className="rotate-180" /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDropdown;
