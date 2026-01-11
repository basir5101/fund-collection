// app/admin/actions.js
"use server";

import dbConnect from "@/lib/mongodb";
import HomeContent from "@/models/HomePage";
import { revalidatePath } from "next/cache";

export async function saveHomeContent(formData) {
  await dbConnect();

  const data = {
    bannerTitle: formData.get("bannerTitle") || "",
    bannerSubtitle: formData.get("bannerSubtitle") || "",
    bannerContent: formData.get("bannerContent") || "",
    bannerImage: formData.get("bannerImage") || "",
    bannerVideo: formData.get("bannerVideo") || "",
    whyNeedTitle: formData.get("whyNeedTitle") || "",
    whyNeedImage: formData.get("whyNeedImage") || "",
    whyNeedContent: formData.get("whyNeedContent") || "",
    footerText: formData.get("footerText") || "",
  };

  try {
    // We use an empty filter {} because there is only one document
    await HomeContent.findOneAndUpdate({}, data, {
      upsert: true,
      new: true,
      runValidators: true,
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true, message: "Content updated successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update content." };
  }
}
