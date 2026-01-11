"use client";
import { addDonor } from "@/actions/donors";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function DonorForm() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function handleSubmit(formData) {
    setLoading(true);
    const result = await addDonor(formData);
    setMsg(result);
    if (result.success) document.getElementById("donor-form").reset();
    setLoading(false);
  }

  const inputStyle =
    "w-full p-3 rounded-xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none bg-emerald-50/30";

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-50 mb-10">
      <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center">
        <PlusCircle className="mr-2 text-emerald-500" /> নতুন ডোনার যোগ করুন
      </h3>

      <form
        id="donor-form"
        action={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="name"
          placeholder="ডোনারের নাম"
          className={inputStyle}
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="টাকার পরিমাণ (৳)"
          className={inputStyle}
          required
        />

        <select name="medium" className={inputStyle} required>
          <option value="">পেমেন্ট মিডিয়াম বেছে নিন</option>
          <option value="website">website</option>
          <option value="bkash">bKash</option>
          <option value="nagad">Nagad</option>
          <option value="rocket">Rocket</option>
          <option value="bank">Bank</option>
        </select>

        <input
          name="transactionId"
          placeholder="ট্রানজেকশন আইডি (ঐচ্ছিক)"
          className={inputStyle}
        />

        <div className="md:col-span-2">
          <textarea
            name="message"
            placeholder="ছোট বার্তা (ঐচ্ছিক)"
            rows="2"
            className={inputStyle}
          ></textarea>
        </div>

        <button
          disabled={loading}
          className="md:col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all disabled:bg-emerald-300"
        >
          {loading ? "সেভ হচ্ছে..." : "ডোনার লিস্টে যোগ করুন"}
        </button>
      </form>

      {msg && (
        <p
          className={`mt-4 text-center font-medium ${
            msg.success ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {msg.message}
        </p>
      )}
    </div>
  );
}
