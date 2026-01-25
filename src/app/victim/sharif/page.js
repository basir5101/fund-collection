"use client";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Droplets,
  GraduationCap,
  Heart,
  MapPin,
  Share2,
  Stethoscope,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function OmarSharifBiography() {
  const targetAmount = 3000000; // ৩০ লক্ষ টাকা
  const currentRaised = 0; // এটি আপনার ডাটাবেস থেকে আসবে
  const progress = (currentRaised / targetAmount) * 100;
  const images = [
    "https://i.ibb.co/ycFB1dJB/1000091604.jpg",
    "https://i.ibb.co/Ldhc4Gbj/1000091605.jpg",
    "https://i.ibb.co/GQf2zQSL/1000091608.jpg",
    "https://i.ibb.co/ymm2dH2n/1000091609.jpg",
    "https://i.ibb.co/LzMNpzd8/1000091613.jpg",
    "https://i.ibb.co/B2Z2trXQ/1000091614.jpg",
    "https://i.ibb.co/pmgTYWN/1000091587.jpg",
    "https://i.ibb.co/kstVpkTw/1000091586.jpg",
  ];
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 hover:text-green-600 transition font-semibold"
          >
            <ArrowLeft size={20} /> ফিরে যান
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigator.share({
                  title: "ওমর শরীফের জীবন বাঁচাতে এগিয়ে আসুন",
                  url: window.location.href,
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold hover:bg-green-100 transition"
            >
              <Share2 size={16} /> শেয়ার করুন
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Detailed Biography */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Hero Card */}
          <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
              <div className="w-48 h-60 bg-slate-200 rounded-2xl shrink-0 overflow-hidden shadow-inner relative">
                {/* <Image src="/path-to-omar-photo.jpg" alt="Omar Sharif" fill className="object-cover" /> */}
                <img
                  src="https://i.ibb.co/XrKRnKjZ/616069132-1408092260949232-351937793361168066-n.jpg"
                  alt="Omar Sharif"
                  className="object-cover w-full h-full"
                />
                {/* <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
                  প্রোফাইল ছবি
                </div> */}
              </div>
              <div className="space-y-4">
                <span className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  জরুরী ক্যান্সার চিকিৎসা সহায়তা
                </span>
                <h1 className="text-4xl font-black text-slate-800">
                  ওমর শরীফ সরকার
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={18} className="text-green-500" /> ত্রিশাল,
                    ময়মনসিংহ
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap size={18} className="text-green-500" />{" "}
                    পদার্থবিজ্ঞান, গোবিপ্রবি (২০১৯)
                  </div>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  {`"যিনি ২২ বার রক্ত দিয়ে মানুষের জীবন বাঁচাতে সাহায্য করেছেন, আজ
                  মরণব্যাধি ক্যান্সারের বিরুদ্ধে যুদ্ধে তার নিজেরই আপনার সাহায্য
                  প্রয়োজন।"`}
                </p>
              </div>
            </div>
          </section>

          {/* Medical Status Alert */}
          <section className="bg-gradient-to-r from-green-500 to-green-600 p-1 rounded-3xl shadow-lg shadow-green-100">
            <div className="bg-white p-6 rounded-[22px] flex gap-5">
              <div className="bg-green-100 p-3 rounded-2xl self-start">
                <AlertTriangle className="text-green-600" size={32} />
              </div>
              <div>
                <h3 className="font-bold text-green-600 text-xl mb-2 tracking-tight">
                  অস্টিওসার্কোমা (Osteosarcoma)
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  এটি একটি অত্যন্ত আক্রমণাত্মক বোন ক্যান্সার। ৩০শে ডিসেম্বর
                  রিপোর্টে এই রোগ ধরা পড়ে। বর্তমানে তিনি জাতীয় ক্যান্সার গবেষণা
                  ইন্সটিটিউটে ডা. মুহাম্মদ আসাদুজ্জামান বিদ্যুৎ-এর তত্ত্বাবধানে
                  চিকিৎসাধীন। দ্রুত উন্নত চিকিৎসার জন্য তাকে ভারতের চেন্নাই নিয়ে
                  যাওয়া জরুরি।
                </p>
              </div>
            </div>
          </section>

          {/* Life & Social Works */}
          <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
            <h2 className="text-2xl font-black text-slate-800 border-b pb-4 flex items-center gap-3">
              <Activity className="text-green-500" size={28} /> সামাজিক ও মানবিক
              কার্যক্রম
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <Droplets className="text-red-500" size={20} /> নিয়মিত
                  রক্তদাতা
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {`ছোটবেলা থেকেই মানুষের জন্য কাজ করা তার নেশা। এ পর্যন্ত তিনি ২২
                  বার রক্তদান করেছেন। কলেজে থাকাকালীন "এডভান্সড ব্লাড ডোনার্স
                  সোসাইটি" গড়ে তোলেন।`}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <Users className="text-blue-500" size={20} /> মানবিক ত্রাণ
                  সহায়তা
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  ২০২৪ সালের বন্যায় শেরপুর জেলায় ৩৫০-৪০০ পরিবারের মাঝে ত্রাণ ও
                  নগদ অর্থ বিতরণে অগ্রণী ভূমিকা পালন করেন। ২০২৩ সালের শীতে ১৮০টি
                  পরিবারের মাঝে শীতবস্ত্র বিতরণ করেন।
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <Calendar className="text-amber-500" size={20} /> ক্যাম্পাস
                  সংস্কার
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {`বিশ্ববিদ্যালয়ের পরিবহন সংকট নিরসনে "ঘণ্টায় ঘণ্টায় বাস সার্ভিস"
                  চালু এবং কেন্দ্রীয় মাঠে নিজস্ব অর্থায়নে সুপেয় পানির কল
                  স্থাপনের মতো কাজ করেছেন।`}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <Stethoscope className="text-purple-500" size={20} /> অকুতোভয়
                  সংগঠক
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  ২০১৮ সালের নিরাপদ সড়ক আন্দোলন এবং ২০২৪ সালের কোটা সংস্কার
                  আন্দোলনে তিনি গোবিপ্রবি ক্যাম্পাসে সাহসী ভূমিকা পালন করেন।
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <h3 className="font-bold text-slate-800">
                কার্যক্রমের কিছু স্থিরচিত্র:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 italic"
                  >
                    <img
                      src={src}
                      alt={`Image ${i + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Donation Widget */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[32px] p-8 shadow-2xl shadow-green-100 border border-green-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Heart size={50} className="text-green-500" />
              </div>

              <h3 className="text-2xl font-black text-slate-800 mb-6">
                চিকিৎসা তহবিল
              </h3>

              <div className="space-y-4">
                <Link
                  href="/donate"
                  className="w-full bg-green-500 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-green-600 transition shadow-xl shadow-green-200 active:scale-[0.98]"
                >
                  <Heart fill="white" size={24} /> দান করুন
                </Link>
                <p className="text-[11px] text-slate-400 text-center px-4 leading-relaxed">
                  আপনার দান সরাসরি ওমর শরীফের চিকিৎসার জন্য নির্ধারিত তহবিলে জমা
                  হবে।
                </p>
              </div>
            </motion.div>

            {/* Family Background Card */}
            <div className="bg-slate-800 rounded-3xl p-6 text-white shadow-xl">
              <h4 className="font-bold mb-3 flex items-center gap-2 text-green-400">
                <Users size={18} /> পরিবারের অবস্থা
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                ওমর শরীফ কৃষক বাবার ৭ সন্তানের মধ্যে সবার ছোট। তার এই ব্যয়বহুল
                চিকিৎসা (২৫-৩০ লক্ষ টাকা) তার পরিবারের পক্ষে নির্বাহ করা
                একেবারেই অসম্ভব। আপনার ছোট প্রচেষ্টাই তাকে আবারো আমাদের মাঝে
                ফিরিয়ে দিতে পারে।
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
