"use server";
import dbConnect from "@/lib/mongodb";
import Donor from "@/models/Donors";
import { revalidatePath } from "next/cache";

export async function addDonor(formData) {
  await dbConnect();

  try {
    const rawData = {
      name: formData.get("name"),
      amount: Number(formData.get("amount")),
      medium: formData.get("medium"),
      message: formData.get("message"),
      transactionId: formData.get("transactionId"),
    };
    const dateValue = formData.get("date");
    if (dateValue) {
      rawData.date = new Date(dateValue);
    }

    await Donor.create(rawData);
    revalidatePath("/admin/donors"); // পেজ রিফ্রেশ না করেই ডাটা আপডেট হবে
    revalidatePath("/");
    revalidatePath("/donors");

    return { success: true, message: "ডোনার সফলভাবে যোগ করা হয়েছে!" };
  } catch (error) {
    return { success: false, message: "ত্রুটি: " + error.message };
  }
}

export async function addDonorFromEPS(formData) {
  await dbConnect();

  try {
    await Donor.create(formData);
    revalidatePath("/admin/donors"); // পেজ রিফ্রেশ না করেই ডাটা আপডেট হবে
    revalidatePath("/");
    revalidatePath("/donors");

    return { success: true, message: "ডোনার সফলভাবে যোগ করা হয়েছে!" };
  } catch (error) {
    return { success: false, message: "ত্রুটি: " + error.message };
  }
}

export async function getDonors(page = 1, limit = 20, searchTerm = "") {
  await dbConnect();
  const skip = (page - 1) * limit;

  // Exact Match Logic
  const query = searchTerm
    ? { transactionId: searchTerm } // Matches the string exactly (Case-Sensitive)
    : {};

  const donors = await Donor.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Donor.countDocuments(query);

  return {
    donors: JSON.parse(JSON.stringify(donors)),
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
}

export async function getDonationStatsByMedium() {
  await dbConnect();

  try {
    const stats = await Donor.aggregate([
      {
        // medium অনুযায়ী গ্রুপ করবে এবং অ্যামাউন্ট যোগ করবে
        $group: {
          _id: "$medium",
          total: { $sum: "$amount" },
        },
      },
      {
        // আউটপুট ফরম্যাট আপনার রিকোয়েস্ট অনুযায়ী সেট করা হয়েছে
        $project: {
          _id: 0, // ডিফল্ট আইডি বাদ দেওয়া হয়েছে
          type: "$_id", // _id কে type হিসেবে দেখানো হয়েছে
          amount: "$total", // total কে amount হিসেবে দেখানো হয়েছে
        },
      },
      {
        // চাইলে সর্ট করে নিতে পারেন (অ্যামাউন্টের ভিত্তিতে বড় থেকে ছোট)
        $sort: { amount: -1 },
      },
    ]);

    return { success: true, data: stats };
  } catch (error) {
    console.error("Aggregation Error:", error);
    return { success: false, message: "হিসাব বের করতে সমস্যা হয়েছে" };
  }
}

export async function deleteDonor(id) {
  await dbConnect();

  try {
    await Donor.findByIdAndDelete(id);
    revalidatePath("/donors"); // ডিলিট হওয়ার পর লিস্ট আপডেট করবে
    revalidatePath("/");
    revalidatePath("/admin/donors");
    return { success: true, message: "ডোনারের তথ্য মুছে ফেলা হয়েছে" };
  } catch (error) {
    return { success: false, message: "মুছে ফেলতে ব্যর্থ: " + error.message };
  }
}

export async function donationsByMedium() {
  await dbConnect();
  try {
    const stats = await Donor.aggregate([
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            medium: "$medium",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.date": 1 } },
    ]);

    // Format data for ApexCharts: series: [{ name: 'bkash', data: [10, 20...] }]
    const mediums = ["bkash", "nagad", "rocket", "bank", "website", "campaign"];
    const uniqueDates = [...new Set(stats.map((item) => item._id.date))];

    const series = mediums.map((m) => ({
      name: m.charAt(0).toUpperCase() + m.slice(1),
      data: uniqueDates.map((date) => {
        const found = stats.find(
          (s) => s._id.date === date && s._id.medium === m,
        );
        return found ? found.totalAmount : 0; // Return 0 if no donation for that medium on that day
      }),
    }));

    return { success: true, categories: uniqueDates, series };
  } catch (error) {
    console.error("Aggregation Error:", error);
    return { success: false, message: "হিসাব বের করতে সমস্যা হয়েছে" };
  }
}
