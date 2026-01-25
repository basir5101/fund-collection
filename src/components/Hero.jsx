"use client";
import paymentIcon from "@/assets/icons/payment.png";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
            মেধাবী শিক্ষার্থী{" "}
            <span className="text-green-500"> ওমর শরীফের জীবন বাঁচাতে </span>
            <br />
            <span className="text-xl lg:text-3xl">আমাদের সবার সাহায্য চাই</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed"
          >
            গোবিপ্রবির পদার্থবিজ্ঞান বিভাগের মেধাবী ছাত্র{" "}
            <strong>ওমর শরীফ </strong> এখন হাড়ের ক্যান্সারের (অস্টিওসারকোমা)
            সাথে যুদ্ধ করছেন। ২২ বার রক্ত দিয়ে মানুষের জীবন বাঁচানো এই পরোপকারী
            তরুণের সুচিকিৎসার জন্য জরুরি ভিত্তিতে ২৫-৩০ লক্ষ টাকা প্রয়োজন।
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex lg:flex flex-col lg:flex-row gap-4"
          >
            <Link
              href="/donate"
              className="bg-green-500 text-white text-base py-3 px-6  lg:text-lg font-bold lg:px-12 lg:py-4 rounded-full shadow-2xl hover:bg-green-600 transform hover:scale-105 transition w-full lg:w-fit"
            >
              দান করুন
            </Link>
            <Link
              href="/victim/sharif"
              className="items-center gap-2 border border-green-700  hover:bg-green-200 text-green-700 text-base lg:text-lg font-bold py-3 px-8 lg:py-4 lg:px-12 rounded-full shadow-lg shadow-green-100 transition-all transform hover:scale-105 active:scale-95"
            >
              শরীফ সম্পর্কে বিস্তারিত
            </Link>
          </motion.div>
        </div>
        <div className="">
          <div className="max-w-lg relative">
            <Image
              // src={heroBanner}
              src="/sharif_banner.jpg"
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
                    width={40}
                    height={40}
                    alt="Payment Icon"
                    className="object-contain"
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
