"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle,
  Copy,
  HandCoins,
  Home,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("txnId") || "N/A";
  const [copied, setCopied] = useState(false);
  const onHome = () => {};

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transactionId);
      setCopied(true);

      // Reset the "Copied" state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

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

        <div className="relative bg-slate-50 p-4 rounded-xl mb-8 border border-dashed border-slate-300 group transition hover:border-green-300">
          <div className="flex justify-between items-start">
            <div className="text-left">
              <p className="text-xs text-slate-500 mb-1">
                আপনার ট্রানজেকশন আইডি
              </p>
              <p className="font-mono font-bold text-xl text-slate-800 tracking-wider">
                {transactionId}
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-green-600 active:scale-95"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check size={20} className="text-green-500" />
              ) : (
                <Copy size={20} />
              )}
            </button>
          </div>

          {/* Inline Toaster/Feedback */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-10 right-0 bg-green-600 text-white text-[10px] px-3 py-1 rounded-full shadow-lg font-bold"
              >
                কপি করা হয়েছে!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <button
            className="w-full bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition"
            onClick={() => {
              navigator
                .share?.({
                  title: "একটি জীবন বাঁচাতে এগিয়ে আসুন",
                  text: "আমি দান করেছি, আপনিও এগিয়ে আসুন।",
                  url: window.location.href,
                })
                .catch(() =>
                  alert(
                    "লিঙ্কটি কপি করা হয়েছে। আপনার বন্ধুদের সাথে শেয়ার করুন।",
                  ),
                );
            }}
          >
            <Share2 size={20} /> প্রচারণা শেয়ার করুন
          </button>

          <div className="flex justify-between">
            <Link
              href="/"
              className="w-full border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-xl flex items-center justify-center gap-1 hover:bg-slate-50 transition"
            >
              <Home size={20} /> হোম পেজ
            </Link>
            <Link
              href="/donors"
              className="w-full ml-3 border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition"
            >
              <HandCoins size={20} /> দাতাদের তালিকা
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// 3. The main page component wraps the content in Suspense
export default function SuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
