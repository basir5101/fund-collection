"use client";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
// import ProgressBar from '../components/ProgressBar';
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
        >
          একটি জীবন বাঁচাতে <br />
          <span className="text-green-500">আমাদের সবার সাহায্য চাই</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10"
        >
          আমাদের কাছের মানুষটি ক্যান্সারের সাথে যুদ্ধ করছে। চিকিৎসার জন্য বিপুল
          অর্থের প্রয়োজন। আপনার সামান্য দান তার জীবন ফিরিয়ে দিতে পারে।
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
  );
}
