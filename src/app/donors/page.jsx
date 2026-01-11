import { getDonors } from "@/actions/donors";
import { ChevronLeft, ChevronRight, Clock, Heart, SearchX } from "lucide-react";
import Link from "next/link";
import SearchDonors from "./SearchDonors";

export default async function DonorsPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const search = params.search || ""; // URL থেকে সার্চ টার্ম নেওয়া

  const { donors, totalPages, currentPage } = await getDonors(page, 20, search);

  return (
    <div className="min-h-screen bg-[#F7FCFA] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-emerald-950 mb-3">
            আমাদের গর্বিত দাতারা
          </h1>
          <p className="text-emerald-600 font-medium">
            আপনাদের সকলের সাহায্যের তালিকা এখানে সংরক্ষিত রয়েছে
          </p>
        </div>

        {/* Search Option */}
        <SearchDonors />

        {/* Donors List */}
        <div className="space-y-4">
          {donors.length > 0 ? (
            donors.map((donor, idx) => (
              <div
                key={donor._id}
                className="flex items-center space-x-4 bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm transition-all hover:shadow-md"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-100">
                  <Heart size={24} fill="currentColor" />
                </div>

                <div className="flex flex-col flex-grow">
                  <span className="font-bold text-emerald-900 text-xl">
                    {donor.name}
                  </span>
                  <div className="flex flex-col text-emerald-500/80 text-sm mt-1">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1.5" />
                      <span>{donor.medium} এর মাধ্যমে</span>
                    </div>
                    {donor.transactionId && (
                      <span className="text-[10px] font-mono text-gray-400 mt-1 uppercase">
                        TrxID: {donor.transactionId}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-emerald-600 text-2xl">
                    ৳{donor.amount.toLocaleString()}
                  </span>
                  {idx === 0 && currentPage === 1 && !search && (
                    <span className="block bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase text-center mt-1">
                      সর্বশেষ
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            /* No Results Found */
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-emerald-200">
              <SearchX size={48} className="mx-auto text-emerald-200 mb-4" />
              <p className="text-emerald-900 font-bold text-xl">
                কোনো তথ্য পাওয়া যায়নি
              </p>
              <p className="text-emerald-500">
                অন্য কোনো ট্রানজেকশন আইডি দিয়ে চেষ্টা করুন
              </p>
            </div>
          )}
        </div>

        {/* Pagination Controls - শুধুমাত্র রেজাল্ট থাকলে দেখাবে */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-12">
            <Link
              href={`?page=${Math.max(1, currentPage - 1)}${
                search ? `&search=${search}` : ""
              }`}
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
              href={`?page=${Math.min(totalPages, currentPage + 1)}${
                search ? `&search=${search}` : ""
              }`}
              className={`p-3 rounded-full bg-white border border-emerald-100 ${
                currentPage === totalPages
                  ? "opacity-30 pointer-events-none"
                  : "hover:bg-emerald-50"
              }`}
            >
              <ChevronRight className="text-emerald-600" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
