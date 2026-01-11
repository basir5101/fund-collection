import { Clock, ShieldCheck } from "lucide-react";
// import ProgressBar from '../components/ProgressBar';

export default function WhyCampaign() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 border-l-4 border-green-500 pl-4">
            কেন এই উদ্যোগ?
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
  );
}
