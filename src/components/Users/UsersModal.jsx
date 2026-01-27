/* eslint-disable react-hooks/set-state-in-effect */
// components/admin/UsersModal.jsx
"use client";

import { addUser, deleteUser, updateUser } from "@/actions/user";
import { Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

const UsersModal = ({
  isOpen,
  onClose,
  mode, // "add" | "edit" | "delete"
  user = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        password: "",
      });
    } else if (mode === "add") {
      setFormData({
        name: "",
        email: "",
        role: "user",
        password: "",
      });
    }
    // delete mode doesn't need form
  }, [isOpen, mode, user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (mode === "add" || mode === "edit") {
      const dataToSend = { ...formData };

      // Very basic client-side check
      if (!dataToSend.name.trim() || !dataToSend.email.trim()) {
        alert("নাম এবং ইমেইল দরকার");
        return;
      }
      if (mode === "add" && !dataToSend.password?.trim()) {
        alert("নতুন ইউজারের জন্য পাসওয়ার্ড দিন");
        return;
      }
      if (mode === "add") {
        await addUser(dataToSend);
      }
      if (mode === "edit") {
        await updateUser(user._id, dataToSend);
      }

      onClose();
    }
  };

  const handleDelete = async () => {
    if (!user?._id || isLoading) return;

    await deleteUser(user?._id);
    onClose();
  };

  const title =
    mode === "add"
      ? "নতুন ব্যবহারকারী যোগ করুন"
      : mode === "edit"
        ? "ব্যবহারকারী সম্পাদনা করুন"
        : "ব্যবহারকারী মুছবেন?";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {mode === "delete" ? (
          <div className="p-6">
            <p className="text-gray-600 mb-6">
              আপনি কি নিশ্চিত যে{" "}
              <strong>{user?.name || user?.email || "এই ব্যবহারকারী"}</strong>{" "}
              কে মুছে ফেলতে চান?
              <br />
              <span className="text-red-600 font-medium">
                এই কাজটি অপরিবর্তনীয়।
              </span>
            </p>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
              >
                বাতিল
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 py-2.5 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? "মুছছে..." : "মুছে ফেলুন"}
                {!isLoading && <Trash2 size={18} />}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                পূর্ণ নাম
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="আসল নাম লিখুন"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ইমেইল
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="example@domain.com"
                disabled={isLoading}
                required
              />
            </div>

            {mode === "add" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="শক্তিশালী পাসওয়ার্ড দিন"
                  disabled={isLoading}
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                রোল
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                disabled={isLoading}
              >
                <option value="moderator">মডারেটর</option>
                <option value="admin">অ্যাডমিন</option>
              </select>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-2.5 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
                {!isLoading && <Save size={18} />}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UsersModal;
