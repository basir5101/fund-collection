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
    "w-full p-1 rounded-lg border border-green-100 focus:ring-2 focus:ring-green-500 outline-none bg-green-50/30";

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-green-50 mb-10">
      <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center">
        <PlusCircle className="mr-2 text-green-500" /> নতুন ডোনার যোগ করুন
      </h3>

      <form
        id="donor-form"
        action={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="name"
          placeholder="ডোনারের নাম (ঐচ্ছিক)"
          className={inputStyle}
        />
        <input
          name="transactionId"
          placeholder="ট্রানজেকশন আইডি (ঐচ্ছিক)"
          className={inputStyle}
        />
        <select name="medium" className={inputStyle} required>
          <option value="">পেমেন্ট মিডিয়াম বেছে নিন</option>
          <option value="campaign">Campaign</option>
          <option value="bkash">BKash</option>
          <option value="nagad">Nagad</option>
          <option value="rocket">Rocket</option>
          <option value="bank">Bank</option>
        </select>
        <input
          name="amount"
          type="number"
          placeholder="টাকার পরিমাণ (৳)"
          className={inputStyle}
          required
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
          className="md:col-span-2 flex w-32 justify-center  bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md transition-all disabled:bg-green-300"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      {msg && (
        <p
          className={`mt-4 text-center font-medium ${
            msg.success ? "text-green-600" : "text-red-500"
          }`}
        >
          {msg.message}
        </p>
      )}
    </div>
  );
}
