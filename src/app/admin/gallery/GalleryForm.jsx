"use client";
import { addGalleryItem } from "@/actions/gallery";
import { ImagePlus } from "lucide-react";
import { useState } from "react";

export default function GalleryForm() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function handleSubmit(formData) {
    setLoading(true);
    const result = await addGalleryItem(formData);
    setMsg(result);
    if (result.success) document.getElementById("gallery-form").reset();
    setLoading(false);
  }

  const inputStyle =
    "w-full p-4 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none bg-emerald-50/20";

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-50 mb-12">
      <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center">
        <ImagePlus className="mr-2 text-emerald-500" /> নতুন ছবি যোগ করুন
      </h3>

      <form id="gallery-form" action={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="event"
            placeholder="ইভেন্টের নাম (ঐচ্ছিক)"
            className={inputStyle}
          />
          <input
            name="image"
            placeholder="ইমেজ ইউআরএল (https://...)"
            className={inputStyle}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all disabled:bg-emerald-300 shadow-lg shadow-emerald-100"
        >
          {loading ? "আপলোড হচ্ছে..." : "গ্যালারিতে যুক্ত করুন"}
        </button>
      </form>

      {msg && (
        <p
          className={`mt-4 text-center text-sm font-semibold ${
            msg.success ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {msg.message}
        </p>
      )}
    </div>
  );
}
