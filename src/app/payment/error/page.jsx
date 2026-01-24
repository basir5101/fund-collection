"use client";
import { motion } from "framer-motion";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ErrorContent = () => {
  const searchParams = useSearchParams();

  // Extract the error message and transaction ID from the URL query
  const errorMessage =
    searchParams.get("msg") || "পেমেন্ট সম্পন্ন করা সম্ভব হয়নি।";
  const transactionId = searchParams.get("txnId") || "N/A";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-red-50"
      >
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="text-red-500" size={48} />
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          দুঃখিত! পেমেন্ট ব্যর্থ হয়েছে
        </h1>

        <p className="text-slate-600 mb-6">{errorMessage}</p>

        {/* Transaction ID Reference (Optional for Errors) */}
        {transactionId !== "N/A" && (
          <div className="bg-slate-50 p-4 rounded-xl mb-8 border border-slate-200">
            <p className="text-xs text-slate-500 mb-1">রেফারেন্স আইডি</p>
            <p className="font-mono font-semibold text-slate-700">
              {transactionId}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {/* Retry Button */}
          <Link
            href="/donate"
            className="w-full bg-red-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-600 transition shadow-lg shadow-red-100"
          >
            <RefreshCcw size={20} /> পুনরায় চেষ্টা করুন
          </Link>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition"
            >
              <Home size={20} /> হোম পেজ
            </Link>

            {/* <Link
              href="/contact"
              className="flex-1 border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition"
            >
              <MessageCircle size={20} /> সাহায্য নিন
            </Link> */}
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          যদি আপনার অ্যাকাউন্ট থেকে টাকা কেটে নেওয়া হয় কিন্তু এখানে ব্যর্থ
          দেখায়, তবে দয়া করে আমাদের সাথে যোগাযোগ করুন।
        </p>
      </motion.div>
    </div>
  );
};

export default function ErrorPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Suspense
        fallback={<div className="animate-pulse">প্রসেসিং হচ্ছে...</div>}
      >
        <ErrorContent />
      </Suspense>
    </div>
  );
}
