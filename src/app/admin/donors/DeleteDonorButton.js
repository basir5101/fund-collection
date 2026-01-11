"use client";
import { deleteDonor } from "@/actions/donors";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteDonorButton({ id }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (confirm("আপনি কি নিশ্চিতভাবে এই ডোনারের তথ্য মুছে ফেলতে চান?")) {
      setLoading(true);
      const result = await deleteDonor(id);
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
      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all disabled:text-gray-300 shrink-0"
      title="মুছে ফেলুন"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={20} />
      )}
    </button>
  );
}
