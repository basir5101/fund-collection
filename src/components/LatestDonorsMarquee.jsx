import { getDonors } from "@/actions/donors";
import { Clock, Heart, User } from "lucide-react";
import moment from "moment";

export default async function LatestDonorsMarquee() {
  const donorResponse = await getDonors(1, 5);
  const donors = donorResponse.donors;
  return (
    <section className="bg-[#F7FCFA] py-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-emerald-950 mb-3">
            সর্বশেষ ডোনার লিস্ট
          </h2>
          <p className="text-emerald-600 font-medium text-lg">
            যারা এগিয়ে এসেছেন সাহায্যের হাত বাড়িয়ে
          </p>
        </div>

        {/* Vertical List Container */}
        <div className="space-y-4">
          {donors.map((donor, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-4 bg-white p-5 md:p-6 rounded-3xl shadow-[0_8px_30px_rgb(16,185,129,0.04)] border border-emerald-50 transition-all hover:shadow-md"
            >
              {/* Green Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-100">
                {donor.name === "Anonymous" ? (
                  <User size={24} />
                ) : (
                  <Heart size={24} fill="currentColor" />
                )}
              </div>

              {/* Donor Name & Time */}
              <div className="flex flex-col flex-grow">
                <span className="font-bold text-emerald-900 text-xl">
                  {donor.name}
                </span>
                <div className="flex items-center text-emerald-500/80 text-sm mt-1">
                  <Clock size={14} className="mr-1.5" />
                  <span> {moment(donor.date).fromNow()} </span>
                </div>
              </div>

              {/* Amount & Latest Badge */}
              <div className="text-right flex flex-col items-end space-y-1">
                <span className="font-black text-emerald-600 text-2xl">
                  ৳{donor.amount.toLocaleString()}
                </span>
                {idx === 0 && (
                  <span className="bg-emerald-100 text-emerald-700 text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    সর্বশেষ
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="mt-12 text-center">
          <p className="text-emerald-800/60 font-semibold text-base">
            মোট <span className="text-emerald-600 font-bold text-lg">৫+</span>{" "}
            জন ডোনার এই ক্যাম্পেইনে অংশ নিয়েছেন
          </p>
        </div>
      </div>
    </section>
  );
}
