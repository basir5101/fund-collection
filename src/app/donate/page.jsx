"use client";
import { getEPSToken, initiateEPSPayment } from "@/actions/payment";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Donate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const onBack = () => router.back();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      toast.error("অনুগ্রহ করে সঠিক পরিমাণ নির্ধারণ করুন।");
      return;
    }

    setLoading(true);

    try {
      // 1. Get the Auth Token [cite: 15-16]
      const token = await getEPSToken();

      if (!token) throw new Error("প্রমাণীকরণ ব্যর্থ হয়েছে");

      // 2. Prepare data for initialization
      const paymentData = {
        orderId: `ORD-${Date.now()}`,
        amount: Number(amount),
        customerData: {
          name: anonymous ? "Anonymous" : name.trim() || "Guest",
          email: "donor@example.com", // Placeholder
          phone: "01700000000", // Placeholder (Required by EPS) [cite: 59]
          address: "Dhaka, Bangladesh",
          city: "Dhaka",
          state: "Dhaka",
          postcode: "1200",
        },
      };

      // 3. Initiate Payment with the EPS Engine [cite: 55-56, 64]
      const initiateResponse = await initiateEPSPayment(token, paymentData);

      if (initiateResponse?.RedirectURL) {
        // 4. Redirect the user to the EPS Payment Gateway [cite: 132]
        window.location.href = initiateResponse.RedirectURL;
      } else {
        throw new Error(
          initiateResponse?.ErrorMessage || "পেমেন্ট ইউআরএল পাওয়া যায়নি",
        );
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("পেমেন্ট শুরু করতে সমস্যা হয়েছে: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Toaster position="top-center" />
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
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-green-500" fill="currentColor" size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            ওমর শরীফকে সহযোগিতা করুন
          </h2>
          <p className="max-w-xl mx-auto text-sm text-slate-600 leading-relaxed mb-4">
            ওমর শরীফ <strong>অস্টিওসার্কোমা (বোন ক্যান্সার)</strong> এর সাথে
            লড়াই করছেন । কৃষক বাবার সন্তান ওমরের পরিবারের পক্ষে এই ব্যয়বহুল
            চিকিৎসার খরচ চালানো অসম্ভব হয়ে পড়েছে।
          </p>
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none disabled:bg-slate-50 transition"
              />
            </div>

            <div className="flex items-center gap-2 px-1">
              <input
                id="anonymous"
                type="checkbox"
                checked={anonymous}
                disabled={loading}
                onChange={(e) => {
                  setAnonymous(e.target.checked);
                  if (e.target.checked) setName("");
                }}
                className="h-4 w-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
              />
              <label
                htmlFor="anonymous"
                className="text-sm text-slate-600 cursor-pointer select-none"
              >
                নাম প্রকাশ করতে চাই না
              </label>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                পরিমাণ (৳)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">
                  ৳
                </span>
                <input
                  type="number"
                  required
                  min="1"
                  value={amount}
                  disabled={loading}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none text-2xl font-bold transition"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
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
