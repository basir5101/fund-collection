"use client";
import { motion } from "framer-motion";
import { Globe, Landmark, Smartphone, Wallet } from "lucide-react";

export default function DonationStatus({ stats }) {
  // logic to calculate percentage
  const totalCollected = 131500;
  const targetAmount = 200000;
  const percentage = Math.min(
    (totalCollected / targetAmount) * 100,
    100
  ).toFixed(1);

  const sources = [
    {
      label: "ওয়েবসাইট",
      amount: "২১,৫০০",
      icon: <Globe size={18} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "bKash",
      amount: "২০,০০০",
      icon: <Smartphone size={18} />,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      label: "Rocket",
      amount: "১০,০০০",
      icon: <Wallet size={18} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "ব্যাংক",
      amount: "৩০,০০০",
      icon: <Landmark size={18} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto my-10 p-8 bg-[#F0F9F6] rounded-[2.5rem] shadow-sm border border-emerald-50">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-800 mb-2">
          ডোনেশন প্রগ্রেস
        </h2>
        <p className="text-green-500">আপনার সহযোগিতায় আমরা এগিয়ে যাচ্ছি</p>
      </div>

      {/* Progress Stats */}
      <div className="flex justify-between items-end mb-4 px-2">
        <div>
          <span className="text-3xl font-black text-green-600">১,৩১,৫০০৳</span>
          <p className="text-xs text-green-500 font-bold uppercase tracking-wider">
            মোট সংগৃহীত
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-green-700">২,০০,০০০৳</span>
          <p className="text-xs text-green-500 font-bold uppercase tracking-wider">
            লক্ষ্যমাত্রা
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-10 bg-gray-200/60 rounded-full overflow-hidden mb-12 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold shadow-lg"
        >
          {percentage}%
        </motion.div>
      </div>

      {/* Source Breakdown */}
      <div className="text-center mb-6">
        <p className="text-sm font-bold text-green-700 mb-6">
          ডোনেশন সোর্স অনুযায়ী
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sources.map((source, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-3 transition-transform hover:scale-105"
            >
              <div className={`p-2 rounded-lg ${source.bg} ${source.color}`}>
                {source.icon}
              </div>
              <span className="text-sm font-medium text-green-600">
                {source.label}
              </span>
              <span className={`text-xl font-bold ${source.color}`}>
                {source.amount}৳
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
