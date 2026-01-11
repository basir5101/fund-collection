// app/admin/AdminForm.js
"use client";

import { saveHomeContent } from "@/actions/home";
import { useState } from "react";

export default function AdminForm({ initialData }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Change handleSubmit to receive formData directly
  async function handleSubmit(formData) {
    // Next.js passes formData automatically here
    setLoading(true);
    setMessage(null);

    try {
      // Pass the formData directly to your server action
      const result = await saveHomeContent(formData);
      setMessage(result);
    } catch (error) {
      setMessage({ success: false, message: "An error occurred" });
    } finally {
      setLoading(false);
    }
  }

  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <form action={handleSubmit} className="space-y-8">
      {/* Banner Section */}
      <section>
        <h2 className="text-xl font-bold text-blue-600 mb-4 border-b pb-2">
          Banner Section
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Banner Title</label>
            <input
              name="bannerTitle"
              defaultValue={initialData?.bannerTitle}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Banner Subtitle</label>
            <input
              name="bannerSubtitle"
              defaultValue={initialData?.bannerSubtitle}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Banner Content</label>
            <textarea
              name="bannerContent"
              defaultValue={initialData?.bannerContent}
              className={inputStyle}
              required
            ></textarea>
          </div>
          <div>
            <label className={labelStyle}>Banner Image URL</label>
            <input
              name="bannerImage"
              defaultValue={initialData?.bannerImage}
              className={inputStyle}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className={labelStyle}>Banner Video URL</label>
            <input
              name="bannerVideo"
              defaultValue={initialData?.bannerVideo}
              className={inputStyle}
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      {/* Why Need Section */}
      <section>
        <h2 className="text-xl font-bold text-blue-600 mb-4 border-b pb-2">
          Information Section
        </h2>
        <div className="space-y-6">
          <div>
            <label className={labelStyle}>Section Title</label>
            <input
              name="whyNeedTitle"
              defaultValue={initialData?.whyNeedTitle}
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Section Content</label>
            <textarea
              name="whyNeedContent"
              defaultValue={initialData?.whyNeedContent}
              rows="4"
              className={inputStyle}
              required
            />
          </div>
          <div>
            <label className={labelStyle}>Section Image</label>
            <input
              name="whyNeedImage"
              defaultValue={initialData?.whyNeedImage}
              className={inputStyle}
              required
            />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section>
        <h2 className="text-xl font-bold text-blue-600 mb-4 border-b pb-2">
          Footer
        </h2>
        <div>
          <label className={labelStyle}>Footer Text</label>
          <input
            name="footerText"
            defaultValue={initialData?.footerText}
            className={inputStyle}
            required
          />
        </div>
      </section>

      {/* Feedback Message */}
      {message && (
        <div
          className={`p-4 rounded-lg text-sm ${
            message.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 shadow-lg"
        }`}
      >
        {loading ? "Saving Changes..." : "Save Home Content"}
      </button>
    </form>
  );
}
