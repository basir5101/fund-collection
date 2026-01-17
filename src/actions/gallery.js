"use server";
import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { revalidatePath } from "next/cache";



export async function addGalleryItem(data) {
  await dbConnect();
  
  await Gallery.create({
    event: data.event,
    image: data.image, // This is the Cloudinary secure_url
  });

  revalidatePath("/gallery");
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
