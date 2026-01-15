"use client";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
// import ProgressBar from '../components/ProgressBar';
import Link from "next/link";
import heroBanner from "@/assets/hero/hero-banner.png";
import paymentIcon from "@/assets/icons/payment.png";
import Image from "next/image";
import { div } from "framer-motion/client";

export default function Hero() {
  return (
    <div className="bg-green-100 py-16 lg:py-24 px-5">
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center max-w-7xl mx-auto gap-10">
        <div className="px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:block text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6"
          >
            একটি জীবন বাঁচাতে <br />
            <span className="text-green-500">আমাদের সবার সাহায্য চাই</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10"
          >
            আমাদের কাছের মানুষটি ক্যান্সারের সাথে যুদ্ধ করছে। চিকিৎসার জন্য
            বিপুল অর্থের প্রয়োজন। আপনার সামান্য দান তার জীবন ফিরিয়ে দিতে পারে।
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/donate"
              className="bg-green-500 text-white text-base py-3 px-6 w-fit lg:text-lg font-bold lg:px-12 lg:py-4 rounded-full shadow-2xl hover:bg-green-600 transform hover:scale-105 transition"
            >
              এখনই দান করুন
            </Link>
            {/* <button className="flex items-center justify-center gap-2 border-2 border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition">
            <Share2 size={20} /> শেয়ার করুন
          </button> */}
          </motion.div>
        </div>
        <div className="">
          <div className="max-w-lg relative">
            <Image
              src={heroBanner}
              width={800}
              height={800}
              alt="Hero Banner Image"
              className="w-full rounded-2xl"
            />
            <div className="absolute w-48 bg-white rounded-lg bottom-0 left-0 lg:-bottom-6 lg:-left-6">
              <div className="p-3 flex items-center gap-2">
                <div className="bg-green-200 rounded-full w-10 h-10 grid shrink-0 place-items-center p-2">
                  <Image
                    src={paymentIcon}
                    width={60}
                    height={60}
                    alt="Book icon"
                    className="w-full"
                  />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">একটু সাহায্য</p>
                  <span className="text-xs text-mute">অনেক বড় পরিবর্তন</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
