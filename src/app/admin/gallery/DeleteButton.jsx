"use client";
import { deleteGalleryItem } from "@/actions/gallery";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteButton({ id }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (confirm("আপনি কি নিশ্চিতভাবে এই ছবিটি মুছে ফেলতে চান?")) {
      setLoading(true);
      const result = await deleteGalleryItem(id);
      if (!result.success) {
        alert(result.message);
      }
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all transform hover:scale-110 disabled:bg-gray-400 z-10"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}
