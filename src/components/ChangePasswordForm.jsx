"use client";

import { changePassword } from "@/actions/user";
import { useState } from "react";

export default function ChangePasswordForm({ userId }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setStatus("error");
      setMessage("নতুন পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না");
      return;
    }

    if (formData.newPassword.length < 6) {
      setStatus("error");
      setMessage("নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    const fd = {
      userId,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };
    const result = await changePassword(fd);

    if (result.success) {
      setStatus("success");
      setMessage("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setStatus("error");
      setMessage(result.error || "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          বর্তমান পাসওয়ার্ড
        </label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          required
          autoComplete="current-password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          নতুন পাসওয়ার্ড
        </label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          required
          autoComplete="new-password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          নতুন পাসওয়ার্ড নিশ্চিত করুন
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          required
          autoComplete="new-password"
        />
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            status === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-2.5 px-4 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
      >
        {status === "loading"
          ? "পরিবর্তন হচ্ছে..."
          : "পাসওয়ার্ড পরিবর্তন করুন"}
      </button>
    </form>
  );
}
