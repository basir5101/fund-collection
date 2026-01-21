// app/victims/[id]/page.tsx   (or wherever your dynamic route is)
"use client";

import { Heart, ArrowLeft, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroBanner from "@/assets/hero/hero-banner.png";

// This would come from your database / server component props or fetch
// For demo we're hardcoding – in real app use params.id to fetch data
const victim = {
  id: "abc123",
  name: "রাহিম খান",
  age: 9,
  disease: "অ্যাকিউট লিউকেমিয়া (ALL)",
  location: "খুলনা",
  story:
    "রাহিম ছোটবেলা থেকেই খুব চঞ্চল ও হাসিখুশি ছিল। গত বছর হঠাৎ জ্বর, দুর্বলতা ও শরীরে নীল দাগ দেখা দিলে ডাক্তাররা পরীক্ষা করে জানান তার অ্যাকিউট লিউকেমিয়া হয়েছে। বাবা একজন রিকশাচালক, পরিবারের পক্ষে চিকিৎসার খরচ বহন করা অসম্ভব হয়ে পড়েছে। কেমোথেরাপি, ওষুধ ও হাসপাতালে থাকার খরচ মিলিয়ে এখনো প্রায় ১২ লাখ টাকার প্রয়োজন।",
  treatmentDetails:
    "বর্তমানে ঢাকা মেডিকেল কলেজ হাসপাতালের শিশু হেমাটোলজি ও অনকোলজি বিভাগে চিকিৎসাধীন। পরবর্তী ৬ মাসের মধ্যে ইনটেনসিভ কেমোথেরাপি ও বোন ম্যারো ট্রান্সপ্লান্টের সম্ভাবনা রয়েছে।",
  raised: 285000,
  goal: 1200000,
  images: [heroBanner, heroBanner, heroBanner, heroBanner],
};

export default function VictimDetails({ params }) {
  const progress = Math.min((victim.raised / victim.goal) * 100, 100);

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50/50 to-white pb-16">
      {/* Back & Share bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/donate"
            className="flex items-center gap-2 text-green-700 hover:text-green-800"
          >
            <ArrowLeft size={20} />
            <span>ফিরে যান</span>
          </Link>

          <button className="flex items-center gap-1.5 text-gray-600 hover:text-green-700">
            <Share2 size={18} />
            <span className="text-sm">শেয়ার</span>
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 pt-6 md:pt-10">
        {/* Header / Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-3">
            {victim.name}
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            বয়স: {victim.age} বছর • {victim.disease}
          </p>
          <p className="text-sm text-gray-500">{victim.location}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-green-800">
              সংগৃহীত: ৳{victim.raised.toLocaleString()}
            </span>
            <span className="font-semibold text-gray-700">
              লক্ষ্য: ৳{victim.goal.toLocaleString()}
            </span>
          </div>
          <div className="h-4 bg-green-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center mt-3 text-sm text-gray-600">
            {progress.toFixed(0)}% অর্জিত • এখনো {victim.goal - victim.raised}{" "}
            টাকা প্রয়োজন
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left - Story & Details */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <Heart className="text-red-500" fill="currentColor" size={24} />
                রাহিমের গল্প
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {victim.story}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-900 mb-4">
                চিকিৎসার বিবরণ
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {victim.treatmentDetails}
              </p>
            </section>
          </div>

          {/* Right - Image Gallery */}
          <div>
            <h2 className="text-2xl font-bold text-green-900 mb-4">ছবিগুলো</h2>
            <div className="grid grid-cols-2 gap-3">
              {victim.images.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-4/3 rounded-xl overflow-hidden shadow-sm border border-green-50 hover:shadow-md transition-shadow"
                >
                  <Image
                    src={src}
                    alt={`${victim.name} - ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/donate?victim=${victim.id}`}
            className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <Heart size={28} fill="white" />
            এখনই সাহায্য করুন
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            আপনার ছোট্ট সাহায্যও রাহিমের জীবন বাঁচাতে পারে
          </p>
        </div>
      </main>
    </div>
  );
}
