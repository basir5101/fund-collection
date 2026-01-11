"use server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { revalidatePath } from "next/cache";

export async function updateEvent(formData) {
  await dbConnect();

  try {
    const data = {
      name: formData.get("name"),
      totalAmount: Number(formData.get("totalAmount")),
      date: new Date(formData.get("date")),
    };

    // {} খালি অবজেক্ট মানে প্রথম যে ডকুমেন্ট পাবে সেটিই আপডেট করবে
    // upsert: true মানে না থাকলে নতুন তৈরি করবে
    await Event.findOneAndUpdate({}, data, { upsert: true, new: true });

    revalidatePath("/admin/event");
    revalidatePath("/");
    revalidatePath("/donors");
    return { success: true, message: "ইভেন্ট সফলভাবে আপডেট হয়েছে!" };
  } catch (error) {
    return { success: false, message: "ত্রুটি: " + error.message };
  }
}

export async function getEvent() {
  await dbConnect();
  const event = await Event.findOne({});
  return event ? JSON.parse(JSON.stringify(event)) : null;
}
