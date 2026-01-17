"use client";
import { addGalleryItem } from "@/actions/gallery"; // Your server action
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function GalleryForm() {
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(formData) {
    toast.loading("loading...");
    setUploading(true);
    const file = formData.get("image");

    // 1. Prepare Cloudinary Upload
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "gallery_preset"); // Use your preset name

    try {
      // 2. Upload directly to Cloudinary
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data },
      );
      const fileData = await res.json();

      // 3. Send the secure_url to your Server Action to save in MongoDB
      await addGalleryItem({
        event: formData.get("event"),
        image: fileData.secure_url, // Cloudinary URL
      });
      toast.dismiss();
      toast.success("ছবি সফলভাবে আপলোড হয়েছে!");
    } catch (error) {
      toast.dismiss();
      console.error("Upload failed:", error);
      toast.error("আপলোড ব্যর্থ হয়েছে!");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Toaster />
      <form
        action={handleSubmit}
        className="mb-10 p-6 bg-white rounded-xl shadow-sm border border-emerald-100"
      >
        <div className="flex flex-col gap-4">
          <input
            name="event"
            placeholder="ইভেন্টের নাম"
            className="p-3 border rounded-lg outline-emerald-500"
            required={false}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="p-3 border rounded-lg outline-emerald-500"
            required
          />
          <button
            disabled={uploading}
            className="bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 disabled:bg-gray-400"
          >
            {uploading ? "আপলোড হচ্ছে..." : "গ্যালারিতে যোগ করুন"}
          </button>
        </div>
      </form>
    </>
  );
}
