"use client";
import { motion } from "framer-motion";
import { Camera, Clock, Share2, ShieldCheck } from "lucide-react";
// import ProgressBar from '../components/ProgressBar';
import { GALLERY_IMAGES, MOCK_DONORS } from "@/lib/constant";
import Link from "next/link";
import DonationStatus from "./DonationStatus";
import LatestDonorsMarquee from "./LatestDonorsMarquee";

export default function Home({ homeContent }) {
  console.log("Rendering Home with content:", homeContent);
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
          >
            {homeContent?.bannerTitle || "একটি জীবন বাঁচাতে"} <br />
            <span className="text-green-500">
              {" "}
              {homeContent?.bannerSubtitle || "আমাদের সবার সাহায্য চাই"}{" "}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10"
          >
            {homeContent?.bannerContent ||
              `আমাদের কাছের মানুষটি ক্যান্সারের সাথে যুদ্ধ করছে। চিকিৎসার জন্য
            বিপুল অর্থের প্রয়োজন। আপনার সামান্য দান তার জীবন ফিরিয়ে দিতে পারে।`}
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/donate"
              className="bg-green-500 text-white text-lg font-bold px-12 py-4 rounded-full shadow-2xl hover:bg-green-600 transform hover:scale-105 transition"
            >
              এখনই দান করুন
            </Link>
            <button className="flex items-center justify-center gap-2 border-2 border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition">
              <Share2 size={20} /> শেয়ার করুন
            </button>
          </motion.div>
        </div>
      </section>
      <DonationStatus />

      <LatestDonorsMarquee donors={MOCK_DONORS} />

      {/* Why This Campaign */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 border-l-4 border-green-500 pl-4">
              {homeContent?.whyNeedTitle || "কেন এই উদ্যোগ?"}
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
              <p>
                গত ৩ মাস ধরে আমাদের প্রিয় এই মানুষটি ব্লাড ক্যান্সারের সাথে লড়াই
                করছে। ইতিমধ্যেই বেশ কিছু কেমোথেরাপি সম্পন্ন হয়েছে, তবে পূর্ণাঙ্গ
                সুস্থতার জন্য প্রয়োজন বোন ম্যারো ট্রান্সপ্ল্যান্ট।
              </p>
              <p>
                মধ্যবিত্ত পরিবারের পক্ষে এই বিপুল খরচ বহন করা প্রায় অসম্ভব হয়ে
                দাঁড়িয়েছে। আপনার দান হতে পারে তার বাঁচার শেষ অবলম্বন।
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock size={16} /> সময় অতিবাহিত হচ্ছে
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck size={16} /> ১০০% স্বচ্ছতা নিশ্চিত
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://picsum.photos/seed/hospital/800/600"
              alt="Medical Journey"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Camera className="text-green-500" />
          <h2 className="text-3xl font-bold text-slate-900">
            গ্যালারি ও তথ্যচিত্র
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md"
            >
              <img
                src={img}
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
