"use client";
import { MOCK_DONORS } from "@/lib/constant";
import { Heart, Search } from "lucide-react";
import { useState } from "react";

const DonorList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDonors = MOCK_DONORS.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          আমাদের গর্বিত দাতারা
        </h1>
        <p className="text-slate-500">
          আপনাদের সকলের সাহায্যের তালিকা এখানে সংরক্ষিত রয়েছে
        </p>
      </div>

      <div className="relative max-w-md mx-auto mb-10">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          type="text"
          placeholder="নাম বা ট্রানজেকশন আইডি দিয়ে খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none shadow-sm"
        />
      </div>

      <div className="grid gap-6">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Heart className="text-rose-500 fill-rose-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    {donor.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {donor.date} • ID: {donor.transactionId}
                  </p>
                  <p className="text-slate-600 italic mt-1 text-sm">
                    {`"${donor.message}"`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-rose-500">
                  {donor.currency === "BDT" ? "৳" : "$"}
                  {donor.amount}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-slate-400">
            কোনো দাতা খুঁজে পাওয়া যায়নি
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorList;
