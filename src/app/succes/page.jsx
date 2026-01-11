"use client";
import { motion } from "framer-motion";
import { CheckCircle, Home, Share2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

const Success = ({}) => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId") || "N/A";
  const onHome = () => {};

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-emerald-50"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-emerald-500" size={48} />
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          অনেক ধন্যবাদ!
        </h1>
        <p className="text-slate-600 mb-8">
          আপনার দান সফলভাবে গ্রহণ করা হয়েছে। আপনার এই সহমর্মিতা আমাদের কাছে অনেক
          মূল্যবান।
        </p>

        <div className="bg-slate-50 p-4 rounded-xl mb-8 border border-dashed border-slate-300">
          <p className="text-xs text-slate-500 mb-1">ট্রানজেকশন আইডি</p>
          <p className="font-mono font-bold text-xl text-slate-800 tracking-wider">
            {transactionId}
          </p>
        </div>

        <div className="space-y-4">
          <button
            className="w-full bg-rose-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-rose-600 transition"
            onClick={() => {
              navigator
                .share?.({
                  title: "একটি জীবন বাঁচাতে এগিয়ে আসুন",
                  text: "আমি দান করেছি, আপনিও এগিয়ে আসুন।",
                  url: window.location.href,
                })
                .catch(() =>
                  alert(
                    "লিঙ্কটি কপি করা হয়েছে। আপনার বন্ধুদের সাথে শেয়ার করুন।"
                  )
                );
            }}
          >
            <Share2 size={20} /> প্রচারণা শেয়ার করুন
          </button>

          <button
            onClick={onHome}
            className="w-full border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition"
          >
            <Home size={20} /> হোম পেজে ফিরে যান
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
