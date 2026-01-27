// app/actions/feedback.js
"use server";

import dbConnect from "@/lib/mongodb";
import Feedback from "@/models/Feedback"; // নিশ্চিত করুন এই মডেলটি তৈরি আছে
import { revalidatePath } from "next/cache";

// ... আগের কোড (addUser ইত্যাদি) ...

// ────────────────────────────────────────────────
//          SAVE FEEDBACK
// ────────────────────────────────────────────────
export async function submitFeedback(data) {
  const { tags, message, name, contact } = data;

  // Validation
  if (!message || !tags || tags.length === 0) {
    return { success: false, error: "মতামত এবং অন্তত একটি ট্যাগ প্রয়োজন।" };
  }

  try {
    await dbConnect();

    const newFeedback = await Feedback.create({
      tags,
      message,
      name: name || "Anonymous",
      contact: contact || "N/A",
      createdAt: new Date(),
    });

    // অ্যাডমিন প্যানেলে নতুন ফিডব্যাক দেখানোর জন্য পাথ রিভ্যালিডেট করুন
    revalidatePath("/admin/feedbacks");

    return {
      success: true,
      message: "আপনার মতামত সফলভাবে সংরক্ষিত হয়েছে।",
    };
  } catch (err) {
    console.error("Feedback submission error:", err);
    return {
      success: false,
      error: "সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।",
    };
  }
}

// ────────────────────────────────────────────────
//          GET ALL FEEDBACKS (Admin View)
// ────────────────────────────────────────────────
export async function getFeedbacks() {
  try {
    await dbConnect();
    // সব ফিডব্যাক লেটেস্ট আগে (descending order) নিয়ে আসবে
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 }).lean();

    // MongoDB _id কে স্ট্রিং এ কনভার্ট করে পাঠানো ভালো (Next.js Client components এর জন্য)
    return {
      success: true,
      data: JSON.parse(JSON.stringify(feedbacks)),
    };
  } catch (err) {
    console.error("Get feedback error:", err);
    return { success: false, error: "ফিডব্যাক লোড করতে সমস্যা হয়েছে।" };
  }
}

// ────────────────────────────────────────────────
//          UPDATE FEEDBACK STATUS
// ────────────────────────────────────────────────
// স্ট্যাটাস হতে পারে: 'new', 'reviewed', 'in-progress', 'resolved'
export async function updateFeedbackStatus(id, status) {
  try {
    await dbConnect();
    const updated = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updated) return { success: false, error: "ফিডব্যাকটি পাওয়া যায়নি।" };

    revalidatePath("/admin/feedbacks");
    return { success: true, message: "স্ট্যাটাস আপডেট হয়েছে।" };
  } catch (err) {
    console.error("Update feedback error:", err);
    return { success: false, error: "আপডেট করতে সমস্যা হয়েছে।" };
  }
}

// ────────────────────────────────────────────────
//          DELETE FEEDBACK
// ────────────────────────────────────────────────
export async function deleteFeedback(id) {
  try {
    await dbConnect();
    const deleted = await Feedback.findByIdAndDelete(id);

    if (!deleted)
      return { success: false, error: "ফিডব্যাকটি আগেই ডিলিট হয়ে থাকতে পারে।" };

    revalidatePath("/admin/feedbacks");
    return { success: true, message: "ফিডব্যাকটি মুছে ফেলা হয়েছে।" };
  } catch (err) {
    console.error("Delete feedback error:", err);
    return { success: false, error: "ডিলিট করতে সমস্যা হয়েছে।" };
  }
}
