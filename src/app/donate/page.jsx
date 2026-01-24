"use client";
import { getEPSToken, initiateEPSPayment } from "@/actions/payment";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Donate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Added loading state

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [method, setMethod] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const onBack = () => router.back();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount) {
      toast.error("অনুগ্রহ করে একটি পরিমাণ নির্ধারণ করুন।");
      return;
    }

    setLoading(true);

    try {
      // 1. Get the Auth Token [cite: 15-16]
      const token = await getEPSToken();

      if (!token) throw new Error("Authentication failed");

      // 2. Prepare data for initialization [cite: 58-60]
      const paymentData = {
        orderId: `ORD-${Date.now()}`,
        amount: Number(amount),
        customerData: {
          name: anonymous ? "Anonymous" : name.trim() || "Guest",
          email: "customer@example.com", // You might want to add an email field to your form
          phone: "01700000000", // You might want to add a phone field to your form
          address: "Dhaka, Bangladesh",
          city: "Dhaka",
          state: "Dhaka",
          postcode: "1200",
        },
      };

      // 3. Initiate Payment with the EPS Engine [cite: 55-56]
      const initiateResponse = await initiateEPSPayment(token, paymentData);

      if (initiateResponse?.RedirectURL) {
        // 4. Redirect the user to the EPS Payment Gateway
        window.location.href = initiateResponse.RedirectURL;
      } else {
        throw new Error(
          initiateResponse?.ErrorMessage || "Could not get payment URL",
        );
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("পেমেন্ট শুরু করতে সমস্যা হয়েছে: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Toaster />
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition"
      >
        <ArrowLeft size={20} /> ফিরে যান
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100"
      >
        <div className="mb-7 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-3 flex items-center justify-center gap-2">
            {/* <Heart className="text-green-500" fill="currentColor" size={32} /> */}
            ওমর শরীফ সরকারকে সহযোগিতা করুন
          </h2>
          <div className="max-w-xl mx-auto text-sm text-gray-700 leading-relaxed mb-4">
            বোন ক্যান্সারের সাথে লড়াই করছে। বাবা রিকশাচালক, পরিবারের পক্ষে
            চিকিৎসার খরচ চালানো খুব কঠিন হয়ে পড়েছে।
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                আপনার নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="নাম (ঐচ্ছিক)"
                disabled={anonymous || loading}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none disabled:bg-slate-100"
              />
            </div>

            <div className="flex items-center">
              <input
                id="anonymous"
                type="checkbox"
                checked={anonymous}
                disabled={loading}
                onChange={(e) => {
                  setAnonymous(e.target.checked);
                  if (e.target.checked) setName("");
                }}
                className="h-4 w-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              />
              <label
                htmlFor="anonymous"
                className="ml-2 block text-sm text-gray-600"
              >
                নাম প্রকাশ করতে চাই না
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                পরিমাণ (৳)
              </label>
              <input
                type="number"
                required
                value={amount}
                disabled={loading}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none text-2xl font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-green-600 transition flex items-center justify-center gap-2 disabled:bg-slate-300"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> প্রসেস করা
                হচ্ছে...
              </>
            ) : (
              "পেমেন্ট সম্পন্ন করুন"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Donate;
