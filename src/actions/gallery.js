"use server";
import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { revalidatePath } from "next/cache";

export async function addGalleryItem(formData) {
  await dbConnect();

  try {
    const rawData = {
      event: formData.get("event"),
      image: formData.get("image"), // এটি হবে ইমেজ ইউআরএল (String)
    };

    if (!rawData.image) throw new Error("ইমেজ ইউআরএল প্রয়োজন");

    await Gallery.create(rawData);
    revalidatePath("/admin/gallery");
    revalidatePath("/");
    return { success: true, message: "ছবিটি গ্যালারিতে যোগ করা হয়েছে!" };
  } catch (error) {
    return { success: false, message: "ত্রুটি: " + error.message };
  }
}

export async function getGalleryItems(page = 1, limit = 6) {
  await dbConnect();
  const skip = (page - 1) * limit;

  const items = await Gallery.find().sort({ date: -1 }).skip(skip).limit(limit);
  const total = await Gallery.countDocuments();

  return {
    items: JSON.parse(JSON.stringify(items)),
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function deleteGalleryItem(id) {
  await dbConnect();

  try {
    await Gallery.findByIdAndDelete(id);
    revalidatePath("/admin/gallery"); // ডিলিট হওয়ার পর পেজ রিফ্রেশ করবে
    revalidatePath("/");
    return { success: true, message: "ছবিটি মুছে ফেলা হয়েছে" };
  } catch (error) {
    return { success: false, message: "মুছে ফেলতে ব্যর্থ: " + error.message };
  }
}
