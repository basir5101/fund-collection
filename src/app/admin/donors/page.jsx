import { getDonors } from "@/actions/donors";
import { ChevronLeft, ChevronRight, Clock, Heart } from "lucide-react";
import Link from "next/link";
import DeleteDonorButton from "./DeleteDonorButton";
import DonorForm from "./DonorForm";

export default async function DonorsPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const { donors, totalPages, currentPage } = await getDonors(page, 5);

  return (
    <div className="min-h-screen bg-[#F7FCFA] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <DonorForm />

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-emerald-950">ডোনার লিস্ট</h2>
        </div>

        <div className="space-y-4">
          {donors.map((donor, idx) => (
            <div
              key={donor._id}
              className="group flex items-center space-x-4 bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm transition-all hover:shadow-md"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-100">
                <Heart size={24} fill="currentColor" />
              </div>

              {/* Donor Info */}
              <div className="flex flex-col flex-grow">
                <span className="font-bold text-emerald-900 text-xl">
                  {donor.name}
                </span>
                <div className="flex items-center text-emerald-500/80 text-sm mt-1">
                  <Clock size={14} className="mr-1.5" />
                  <span>{donor.medium} এর মাধ্যমে</span>
                </div>
              </div>

              {/* Amount and Delete Action */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <span className="font-black text-emerald-600 text-2xl">
                    ৳{donor.amount.toLocaleString()}
                  </span>
                  {idx === 0 && currentPage === 1 && (
                    <span className="block bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase text-center mt-1">
                      সর্বশেষ
                    </span>
                  )}
                </div>

                {/* ডিলিট বাটন এখানে যুক্ত করা হয়েছে */}
                <DeleteDonorButton id={donor._id} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-12">
          <Link
            href={`?page=${Math.max(1, currentPage - 1)}`}
            className={`p-3 rounded-full bg-white border border-emerald-100 ${
              currentPage === 1
                ? "opacity-30 pointer-events-none"
                : "hover:bg-emerald-50"
            }`}
          >
            <ChevronLeft className="text-emerald-600" />
          </Link>

          <span className="font-bold text-emerald-900">
            পেজ {currentPage} / {totalPages}
          </span>

          <Link
            href={`?page=${Math.min(totalPages, currentPage + 1)}`}
            className={`p-3 rounded-full bg-white border border-emerald-100 ${
              currentPage === totalPages
                ? "opacity-30 pointer-events-none"
                : "hover:bg-emerald-50"
            }`}
          >
            <ChevronRight className="text-emerald-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
