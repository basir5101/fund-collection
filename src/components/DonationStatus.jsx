"use client";
import { motion } from "framer-motion";
import { Globe, Landmark, Smartphone, Wallet } from "lucide-react";

export default function DonationStatus({ stats, event }) {
  // 1. Total Calculation
  const totalCollected =
    stats?.reduce((total, stat) => total + stat.amount, 0) || 0;
  const targetAmount = event?.totalAmount || 0;

  // 2. Total Progress Percentage
  const totalPercentage = Math.min(
    (totalCollected / targetAmount) * 100,
    100
  ).toFixed(1);

  // 3. Source Configuration
  const sourceConfigs = [
    {
      label: "ওয়েবসাইট",
      key: "website",
      icon: <Globe size={18} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "bKash",
      key: "bkash",
      icon: <Smartphone size={18} />,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      label: "Nagad",
      key: "nagad",
      icon: <Smartphone size={18} />,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Rocket",
      key: "rocket",
      icon: <Wallet size={18} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "ব্যাংক",
      key: "bank",
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
        <p className="text-green-500 font-medium">
          আপনার সহযোগিতায় আমরা এগিয়ে যাচ্ছি
        </p>
      </div>

      {/* Main Progress Stats */}
      <div className="flex justify-between items-end mb-4 px-2">
        <div>
          <span className="text-2xl font-bold text-green-600">
            {totalCollected.toLocaleString()}৳
          </span>
          <p className="text-xs text-green-500 font-bold uppercase tracking-wider mt-1">
            মোট সংগৃহীত
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-green-700">
            {targetAmount.toLocaleString()}৳
          </span>
          <p className="text-xs text-green-500 font-bold uppercase tracking-wider mt-1">
            লক্ষ্যমাত্রা
          </p>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="relative w-full h-10 bg-gray-200/60 rounded-full overflow-hidden mb-12 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${totalPercentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold shadow-lg"
        >
          {totalPercentage}% অর্জিত
        </motion.div>
      </div>

      {/* Source Breakdown */}
      <div className="text-center">
        <p className="text-sm font-bold text-green-700 mb-6">
          মাধ্যম অনুযায়ী লক্ষ্যমাত্রার কত অংশ সংগৃহীত
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {sourceConfigs.map((config) => {
            // 4. Find amount from stats
            const statEntry = stats?.find((s) => s.type === config.key);
            const amount = statEntry ? statEntry.amount : null;

            // 5. Calculation based on TOTAL TARGET AMOUNT
            const progressOfTarget = amount
              ? ((amount / targetAmount) * 100).toFixed(2)
              : 0;

            return (
              <div
                key={config.key}
                className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center transition-all hover:shadow-md group"
              >
                <div
                  className={`p-3 rounded-2xl mb-3 ${config.bg} ${config.color} transition-transform group-hover:scale-110`}
                >
                  {config.icon}
                </div>

                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">
                  {config.label}
                </span>

                <span className={`text-lg font-black ${config.color} mb-3`}>
                  {amount !== null ? `${amount.toLocaleString()}৳` : "N/A"}
                </span>

                {/* 6. Individual Progress relative to 2,500,000 target */}
                {/* <div className="w-full mt-auto">
                  <div className="flex justify-between text-[9px] font-bold text-gray-500 mb-1">
                    <span>লক্ষ্যমাত্রার:</span>
                    <span className={config.color}>{progressOfTarget}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progressOfTarget, 100)}%` }}
                      className={`h-full rounded-full ${config.color.replace(
                        "text-",
                        "bg-"
                      )}`}
                    />
                  </div>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
