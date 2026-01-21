import { getDonors } from "@/actions/donors";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  Landmark,
  SearchX,
  User,
} from "lucide-react";
import Link from "next/link";
import SearchDonors from "./SearchDonors";
import moment from "moment";
import bkashLogo from "@/assets/icons/bkash.png";
import nagadLogo from "@/assets/icons/nagad.png";
import rocketLogo from "@/assets/icons/rocket.png";
import helpLogo from "@/assets/icons/help.png";
import bankLogo from "@/assets/icons/bank.png";
import websiteLogo from "@/assets/icons/website.png";
import Image from "next/image";

export default async function DonorsPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const search = params.search || "";

  const { donors, totalPages, currentPage } = await getDonors(page, 20, search);

  // Define payment mediums and their display info
  const paymentMethods = {
    bkash: {
      name: "বিকাশ",
      logo: bkashLogo,
      color: "bg-pink-100 text-pink-700 border-pink-200",
    },
    nagad: {
      name: "নগদ",
      logo: nagadLogo,
      color: "bg-orange-100 text-orange-700 border-orange-200",
    },
    rocket: {
      name: "রকেট",
      logo: rocketLogo,
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },
    bank: {
      name: "ব্যাংক ট্রান্সফার",
      logo: bankLogo,
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    website: {
      name: "ওয়েবসাইট",
      logo: websiteLogo,
      color: "bg-teal-100 text-teal-700 border-teal-200",
    },
    campaign: {
      name: "ক্যাম্পেইন",
      logo: helpLogo,
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
  };

  // Helper to get method display info
  const getMethodInfo = (medium) => {
    return (
      paymentMethods[medium?.toLowerCase()] || {
        name: medium || "অজানা",
        logo: null,
        color: "bg-gray-100 text-gray-700 border-gray-200",
      }
    );
  };

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
        <div className="overflow-x-auto rounded-2xl border border-emerald-100 shadow-sm bg-white">
          <table className="min-w-full divide-y divide-emerald-100">
            <thead className="bg-emerald-50/70">
              <tr>
                <th
                  scope="col"
                  className="py-4 pl-6 pr-3 text-left text-sm font-semibold text-emerald-800 sm:pl-8"
                >
                  ডোনার
                </th>
                <th
                  scope="col"
                  className="hidden sm:table-cell px-3 py-4 text-left text-sm font-semibold text-emerald-800"
                >
                  সময়
                </th>
                <th
                  scope="col"
                  className="hidden sm:table-cell px-3 py-4 text-left text-sm font-semibold text-emerald-800"
                >
                  ট্রাঞ্জেকশন ID
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-right text-sm font-semibold text-emerald-800 sm:pr-8"
                >
                  পরিমাণ
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-50 bg-white">
              {donors.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-12 text-center text-emerald-600/70"
                  >
                    এখনো কোনো ডোনেশন আসেনি
                  </td>
                </tr>
              ) : (
                donors.map((donor, idx) => {
                  const methodInfo = getMethodInfo(donor.medium);
                  return (
                    <tr
                      key={idx}
                      className={`
                      hover:bg-emerald-50/40 transition-colors
                      ${idx === 0 ? "bg-emerald-50/30 font-medium" : ""}
                    `}
                    >
                      {/* Donor Name + Icon */}
                      <td className="whitespace-nowrap py-3 pl-6 pr-3 sm:pl-8">
                        <div className="flex items-center gap-3">
                          <div className="font-medium text-emerald-900">
                            {donor.name}
                            {idx === 0 && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                সর্বশেষ
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Time - hidden on mobile, or show below name if you want */}
                      <td className="hidden whitespace-nowrap py-3 px-3 text-sm text-emerald-600 sm:table-cell">
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} />
                          {moment(donor.date).fromNow()}
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap py-3 px-3 text-sm text-emerald-600 sm:table-cell">
                        <div className="flex items-center gap-2">
                          {methodInfo.logo ? (
                            <div
                              className={`h-9 w-9 p-1 rounded-md border ${methodInfo.color}`}
                            >
                              <Image
                                src={methodInfo.logo}
                                width={28}
                                height={28}
                                alt={`${methodInfo.name} logo`}
                                className="w-full h-full"
                              />
                            </div>
                          ) : (
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-md border ${methodInfo.color}`}
                            >
                              {donor.medium === "bank" ? (
                                <Landmark size={20} />
                              ) : donor.medium === "website" ? (
                                <Globe size={20} />
                              ) : (
                                <span className="text-xs font-bold">
                                  {methodInfo.name?.charAt(0)}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="flex flex-col">
                            {/* <span className="font-medium text-emerald-800">
                              {methodInfo.name}
                            </span> */}
                            {donor.transactionId && (
                              <span className="text-[10px] font-mono text-gray-500">
                                {donor.transactionId}
                                {/* fjh48y3fhu455c3ddw */}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="whitespace-nowrap py-3 pl-3 pr-6 text-right font-bold text-emerald-700 sm:pr-8">
                        ৳{donor.amount.toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls - শুধুমাত্র রেজাল্ট থাকলে দেখাবে */}
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
      </div>
    </div>
  );
}
