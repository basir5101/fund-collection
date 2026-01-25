import { Clock, HandCoins } from "lucide-react";
import Link from "next/link";

export default function WhyCampaign() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-justify">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 border-l-4 border-green-500 pl-4 font-serif">
            কেন এই উদ্যোগ?
          </h2>

          <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
            <p>
              ওমর শরীফ গোপালগঞ্জ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়ের
              পদার্থবিজ্ঞান বিভাগের একজন মেধাবী ছাত্র। গত ৩০শে ডিসেম্বর তার
              রিপোর্টে <strong>অস্টিওসার্কোমা (বোন ক্যান্সার)</strong> ধরা পড়ে।
              ইতিমধ্যই তিনি ২টি কেমোথেরাপি সম্পন্ন করেছেন, তবে পূর্ণাঙ্গ
              সুস্থতার জন্য দ্রুত ভারতে (চেন্নাই) উন্নত চিকিৎসা প্রয়োজন।
            </p>

            <p>
              যিনি নিজে ২২ বার রক্ত দিয়ে মানুষের জীবন বাঁচিয়েছেন এবং বন্যার্ত ও
              দুস্থদের সেবায় নিজের জীবন উৎসর্গ করেছেন, আজ তিনি নিজেই জীবনের এক
              কঠিন সন্ধিক্ষণে দাঁড়িয়ে। কৃষক বাবার সাত সন্তানের মধ্যে সবার ছোট
              ওমর শরীফের চিকিৎসার জন্য প্রয়োজন প্রায়{" "}
              <strong>২৫ থেকে ৩০ লক্ষ টাকা</strong>, যা তার পরিবারের পক্ষে বহন
              করা অসম্ভব।
            </p>

            <p className="font-semibold text-slate-800 italic">
              {`"আমাদের ছোট্ট একটি সম্মিলিত প্রচেষ্টা হয়তো পারে একজন স্বপ্নবাজ
              তরুণকে আবারও আমাদের মাঝে ফিরিয়ে দিতে।"`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl text-red-700 font-medium">
              <Clock size={20} className="shrink-0" />
              <span>দ্রুত চিকিৎসা প্রয়োজন</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl text-green-700 font-medium">
              <HandCoins size={20} className="shrink-0" />
              <span> সকলের সহযোগিতা কাম্য </span>
            </div>
          </div>
        </div>

        <div className="relative group">
          {/* Decorative background blur */}
          <div className="absolute -inset-4 bg-green-100/50 rounded-[2rem] blur-2xl group-hover:bg-green-200/50 transition duration-500"></div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img
              src="/why_cam.jpg"
              alt="Omar Sharif Social Work"
              className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105"
            />
            {/* Contextual overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-sm font-medium">
                শেরপুরে বন্যা দুর্গতদের মাঝে ত্রাণ বিতরণ করছেন ওমর শরীফ (২০২৪)
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* link for more info */}
      <div className="mt-8 text-center">
        <Link
          href="/victim/sharif"
          className="text-green-600 font-semibold hover:underline"
        >
          ওমর শরীফের সম্পর্কে আরও জানুন
        </Link>
      </div>
    </section>
  );
}
