"use client";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ExternalLink, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Donate = ({ onSuccess }) => {
  const router = useRouter();
  const onBack = () => {
    router.back();
  };

  const [currency, setCurrency] = useState("BDT");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [method, setMethod] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !method) {
      alert("অনুগ্রহ করে পরিমাণ এবং পেমেন্ট পদ্ধতি নির্বাচন করুন");
      return;
    }
    const fakeTxnId =
      "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const formData = {
      currency,
      amount: Number(amount),
      name: anonymous ? "Anonymous" : name.trim() || "Not provided",
      paymentMethod: method,
      anonymous,
      message: message.trim() || "No message",
      submittedAt: new Date().toISOString(),
      fakeTransactionId: fakeTxnId,
    };
    console.log(formData);
    router.push(`/succes?transactionId=${fakeTxnId}`);
  };

  const paymentMethods = [
    {
      id: "bkash",
      name: "বিকাশ",
      color: "bg-pink-100 border-pink-200 text-pink-700",
    },
    {
      id: "nagad",
      name: "নগদ",
      color: "bg-orange-100 border-orange-200 text-orange-700",
    },
    {
      id: "rocket",
      name: "রকেট",
      color: "bg-purple-100 border-purple-200 text-purple-700",
    },
    {
      id: "bank",
      name: "ব্যাংক ট্রান্সফার",
      color: "bg-blue-100 border-blue-200 text-blue-700",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
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
        {/* Victim emotional summary – right here above the title */}
        <div className="mb-7 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-3 flex items-center justify-center gap-2">
            <Heart className="text-green-500" fill="currentColor" size={32} />
            রাহিমকে সহযোগিতা করুন
          </h2>

          <div className="max-w-xl mx-auto">
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              ছোট্ট রাহিম গত ৩ মাস ধরে ক্যান্সারের সাথে লড়াই করছে। হঠাৎ জ্বর,
              দুর্বলতা আর শরীরে দাগ দেখা দিলে ডাক্তার জানান তার লিউকেমিয়া
              হয়েছে। বাবা রিকশাচালক, পরিবারের পক্ষে চিকিৎসার খরচ চালানো খুব কঠিন
              হয়ে পড়েছে। আপনার সাহায্যই তার জীবনের আশা হতে পারে।
            </p>

            <Link
              href={`/victim/1`}
              className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-800 font-semibold hover:underline"
            >
              বিস্তারিত গল্প ও ছবি দেখুন <ExternalLink size={16} />
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Currency Toggle */}
          {/* <div className="flex justify-center p-1 bg-slate-100 rounded-full w-48 mx-auto">
            <button
              type="button"
              onClick={() => setCurrency("BDT")}
              className={`flex-1 py-1 rounded-full text-sm font-bold transition ${
                currency === "BDT"
                  ? "bg-white shadow-sm text-green-500"
                  : "text-slate-500"
              }`}
            >
              BDT (৳)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`flex-1 py-1 rounded-full text-sm font-bold transition ${
                currency === "USD"
                  ? "bg-white shadow-sm text-green-500"
                  : "text-slate-500"
              }`}
            >
              USD ($)
            </button>
          </div> */}

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
                disabled={anonymous}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none disabled:bg-slate-100"
              />
            </div>

            <div className="flex items-center">
              <input
                id="anonymous"
                type="checkbox"
                checked={anonymous}
                onChange={(e) => {
                  setAnonymous(e.target.checked);
                  if (e.target.checked) setName("");
                }}
                className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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
                পরিমাণ ({currency === "BDT" ? "৳" : "$"})
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none text-2xl font-bold"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                পেমেন্ট পদ্ধতি নির্বাচন করুন
              </label>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((pm) => (
                  <div
                    key={pm.id}
                    onClick={() => setMethod(pm.id)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition flex items-center justify-between ${
                      pm.color
                    } ${
                      method === pm.id
                        ? "ring-2 ring-offset-2 ring-slate-400"
                        : "opacity-70 grayscale-[0.5]"
                    }`}
                  >
                    <span className="font-bold">{pm.name}</span>
                    {method === pm.id && <CheckCircle2 size={18} />}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                ছোট একটি বার্তা
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="আপনার শুভকামনা জানান..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-green-600 transition"
          >
            পেমেন্ট সম্পন্ন করুন
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Donate;
